const stories = require('./routes/stories');
const express = require('express');
const app = express();

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../../client/build')));
}


app.use(express.json());
app.use('/api/story', stories);

module.exports = app;
