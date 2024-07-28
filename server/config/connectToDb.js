if (process.env.NODE_ENV != 'production')
    require('dotenv').config();

const mongoose = require('mongoose');

async function connectToDb(){

    await mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

}

module.exports = connectToDb;