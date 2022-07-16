const stories = require('./routes/stories');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/story', stories);

module.exports = app;
