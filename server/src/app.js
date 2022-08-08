const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const storiesRouter = require('./routes/storyRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/**
 * Global Middleware
 */

// Set security HTTP headers

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    'block-all-mixed-content': true,
    'upgrade-insecure-requests': true,
    directives: {
      'default-src': ["'self'"],
      'base-uri': "'self'",
      'font-src': ["'self'", 'https:', 'data:'],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'object-src': ["'none'"],
      'script-src': ["'self'", 'https://cdnjs.cloudflare.com'],
      'script-src-attr': "'none'",
      'style-src': ["'self'", 'https://cdnjs.cloudflare.com'],
    },
  }),

  helmet.dnsPrefetchControl({ allow: true }),
  helmet.frameguard({ action: 'deny' }),
  helmet.hidePoweredBy(),
  helmet.hsts({ maxAge: 123456, includeSubDomains: false }),
  helmet.ieNoOpen(),
  helmet.noSniff(),
  helmet.referrerPolicy({ policy: ['origin', 'unsafe-url'] }),
  helmet.xssFilter()
);

// cookie parsing
app.use(cookieParser());

// Use morgan for logging requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
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
app.use('/api/story', storiesRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

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
