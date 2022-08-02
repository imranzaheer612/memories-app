const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');


const stories = require('./routes/stories');

const app = express();

/**
 * Setting for heroku deployment
 * Server static assets if in production
*/
if (process.env.NODE_ENV === "production") {
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../../client/build')));
}

/**
 * initial middleware
*/
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

/**
 * Routes
*/
app.use('/api/story', stories);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);

module.exports = app;
