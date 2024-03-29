const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');

const storiesRouter = require('./routes/storyRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

/**
 * Global Middleware
 */

// Set security HTTP headers

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://memobooks.herokuapp.com/',
          'https://firebasestorage.googleapis.com/',
        ],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'https://firebasestorage.googleapis.com/'],
        fontSrc: ["'self'", 'https://*.com', 'data:'],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// cookie parsing
app.use(cookieParser());

// Use morgan for logging requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors());
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

/**
 * Routes
 */
app.use('/api/stories', storiesRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

/**
 * Setting for heroku deployment
 * Server static assets if in production
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
  });
}

app.use(globalErrorHandler);

module.exports = app;
