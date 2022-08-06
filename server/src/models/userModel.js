const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

/**
 * Pre Middlewares
*/

/**
 * Before saving check if user.password modified
 * --> if so then encrypt the new pass with 'bcrypt' using saltCost of '12'
 * --> del passConfirm
 * --> else simply return 
*/
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

/**
 * when ever a new user created or a old user  modified
 * --> set 'passwordChangeAt'
 * 
 * 'passwordChangeAt' helps us in authentication process
 * as the jwt-token issue-date should be greater than 'passwordChangeAt'
*/
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

/**
 * Only return the current users on 'find' related queries
 * Deleted/Inactive users must be hidden
*/
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});


/**
 * Instance Methods
 * /

/**
 * Checks if a given pass in correct
 * @param candidatePassword: plainTextPassword
 * @param userPassword: hashed pass from DB
*/
userSchema.methods.correctPassword = async function( candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


/**
 * Checks if password is changed after jwt-token issued
 * @param JWTTimestamp A jwt-timestamp
 * 
 * Uses user.passwordChangedAt to compare jwt-timestamp with
*/
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};


/**
 * Creates a token a save in 'user.passwordResetToken'.
 * Token created simply using 'crypto' lib
 * 
 * Also adds reset token expires date
 * 
 * @return return a reset token
*/
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
