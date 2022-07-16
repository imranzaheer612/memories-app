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


const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
