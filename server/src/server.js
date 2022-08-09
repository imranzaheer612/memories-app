const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * uncaught error handler for the app
 */
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

/**
 * Database connection
 */
const DB = process.env.DATABASE_URL;
mongoose.connect(DB);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});

/**
 * Start listening
 */
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`App is running on port ${port}...`)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
