import '@babel/polyfill';

import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const conn = mongoose.createConnection();

let MONGO_URI;
if (process.env.NODE_ENV === 'test') {
  MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.TEST_DB_URL}`;
} else {
  MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DEV_DB_URL}`;
}

const createConn = async ()=>{
  conn.openUri(MONGO_URI);
};

createConn();


// connect 하는 부분
const mongoConnect = () => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(MONGO_URI, {
    useUnifiedTopology: false,
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

export {conn, mongoConnect, mongoDisConnect};
