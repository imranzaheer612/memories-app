require('dotenv').config({ path: './src/config/.env' })
const app = require('./app');

if (process.env.ENVIRONMENT  === "DEV") {
    const cors = require('cors');
    app.use(cors())
}

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

// Server static assets if in production

if (process.env.NODE_ENV === "production") {

    app.use(express.static('../../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
