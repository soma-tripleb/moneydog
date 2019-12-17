import '@babel/polyfill';

import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

let MONGO_URI;
if (process.env.NODE_ENV === 'test') {
  MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.TEST_DB_URL}`;
} else {
  // MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DEV_DB_URL}`;
  MONGO_URI = 'mongodb+srv://admin:moneydog1234@moneydog-test-p9fsb.mongodb.net/dev?retryWrites=true&w=majority';
}

// connect 하는 부분
const mongoConnect = () => {
  mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log('Connected mongo server'))
    .catch((err) => console.log(`DB Connection Error: , ${err.message}`));
};

const mongoDisConnect = () => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected mongo server'))
    .catch((e) => {
      console.error(e);
    });
};

export {mongoConnect, mongoDisConnect};
