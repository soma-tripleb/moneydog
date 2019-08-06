require('dotenv').config();

import mongoose from 'mongoose';

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

const conn = mongoose.createConnection(MONGO_URI);

mongoose.connect(MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('Connected to mongod server'))
    .catch((e) => console.error(e));

module.exports = conn;
