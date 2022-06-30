const stories = require('./src/routes/stories');
const express = require('express');
const app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/memories-app');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});

app.use(express.json());
app.use('/api/story', stories);

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));