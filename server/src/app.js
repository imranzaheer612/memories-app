const stories = require('./routes/stories');
const express = require('express');
const app = express();

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
    const path = require('path');

    app.use(express.static(path.join(__dirname, '../../client/build')));
    // app.get('*', (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
    // });
}


app.use(express.json());
app.use('/api/story', stories);

module.exports = app;
