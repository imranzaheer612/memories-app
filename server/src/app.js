const stories = require('./routes/stories');
const express = require('express');
const app = express();
const path = require('path');


// Server static assets if in production
if (process.env.NODE_ENV === "production") {

    app.use(express.static('../../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'));
    });
}


app.use(express.json());
app.use('/api/story', stories);

module.exports = app;
