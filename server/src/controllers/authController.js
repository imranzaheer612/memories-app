const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

/**
 * Generating a jwt token
 *
 * @param id user._id
 * @req process.env.JWT_SECRET as a secrete key
 * @req process.env.JWT_EXPIRES_IN for setting expire date for the token
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * --> Creates a jwt token
 * --> Send token via cookie
 *
 * @param user user-object
 * @param statusCode status code to send while sending token
 * @param res response object
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  /**
   * cookieOptions.secure is false in dev env
   */
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

/**
 * Create a new user and send a jwt token
 */
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

/**
 * logs a user In.
 * --> Check if email and password exist
 * --> Check if user exists && password is correct
 * --> If everything ok, send token to client
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  /**
   * password in not selected as default, so selecting
   * here and comparing
   */
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

/**
 * Protecting routes by checking the jwt-token
 * (1) --> Checking for token in req.headers
 * (2) --> Verify token
 * (3) --> Check if user still exists
 * (4) --> Check if user changed password after the token was issued
 * (5) --> GRANT ACCESS TO PROTECTED ROUTE
 */
exports.protect = catchAsync(async (req, res, next) => {
  // 1)
  let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }

  if (req.cookies) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2)
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3)
  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4)
  if (currentUser.changedPasswordAfter(decodedToken.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // 5)
  req.user = currentUser;
  next();
});

/**
 * Restricting the route access to specific roles
 *
 * @param roles roles you wanna allow the access i.e ['user', 'admin']
 *
 * Check user role using 'req.user.role'
 */
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };

/***
 * Route if user forget the password. Verification mail will be sent to user.
 * (1) --> Get user based on POSTed email
 * (2) --> Generate the random reset token
 * (3) --> Send it to user's email
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1)
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2)
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3)

  /**
   * wrapping token in resetUrl
   * --> clicking it will take user to 'resetPassword' route
   * --> send the mail
   * --> if somethings goes wrong delete reset-token and reset-expires form user document
   */
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n
  If you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

/**
 * 1) --> Get user based on the reset-token
 * 2) --> If token has not expired, and there is user, set the new password
 * 3) --> Update changedPasswordAt property for the user
 * 4) -->Log the user in, send JWT
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1)
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2)
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) 4)
  createSendToken(user, 200, res);
});

/**
 * Updates password of a logged in user
 * 1) --> Get user from collection
 * 2) --> Check if POSTed current password is correct
 * 3) --> If so, update password
 * 4) --> Log user in, send JWT
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1)
  const user = await User.findById(req.user.id).select('+password');

  // 2)
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3)
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4)
  createSendToken(user, 200, res);
});
