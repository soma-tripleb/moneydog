import '@babel/polyfill';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const conn = mongoose.createConnection();

let mongod = null;
if (process.env.NODE_ENV === 'test') {
  mongod = new MongoMemoryServer();
}

const createConn = async ()=>{
  if (process.env.NODE_ENV === 'test') {
    const uri = await mongod.getConnectionString()
      .then((ur) => ur);

    conn.openUri(uri);
  } else {
    conn.openUri(MONGO_URI);
  }
};

createConn();


// connect 하는 부분
const mongoConnect = () => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  if (process.env.NODE_ENV === 'test') {
    mongod.getConnectionString()
      .then((url) =>{
        return mongoose.connect(url);
      })
      .then(console.log('Connected Memory mongo server'))
      .catch((e)=>{
        console.error(e);
      });
  } else {
    mongoose.connect(MONGO_URI, {
      useUnifiedTopology: false,
    })
      .then(() => console.log('Connected mongo server'))
      .catch((err) => console.log(`DB Connection Error: , ${err.message}`));
  }
};

const mongoDisConnect = () => {
  if (process.env.NODE_ENV === 'test') {
    mongoose.disconnect()
      .then(() => console.log('Disconnected mongo server'))
      .catch((e) => {
        console.error(e);
      });
    mongod.stop();
  } else {
    mongoose.disconnect()
      .then(() => console.log('Disconnected mongo server'))
      .catch((e) => {
        console.error(e);
      });
  }
};

export {conn, mongoConnect, mongoDisConnect};
