require('dotenv').config();

import mongoose from 'mongoose';

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

const conn = mongoose.createConnection(MONGO_URI);

// 유 connect 하는 부분
const mongoConnect = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected mongo server');
  }).catch((e) => {
    console.error(e);
  });
};

const mongoDisConnect = () => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected mongo server'))
    .catch((e) => {
      console.error(e);
    });
};

export {conn, mongoConnect, mongoDisConnect};
