const mongoose = require('mongoose');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(path.resolve(__dirname, '../../.env'));
}
const url = process.env.MONGO_URL

const connectDB = async () => {
    await mongoose.connect(url);
}


module.exports = connectDB;