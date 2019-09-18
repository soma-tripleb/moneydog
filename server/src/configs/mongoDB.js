require('dotenv').config();

import mongoose from 'mongoose';
const { MongoMemoryServer } = require('mongodb-memory-server');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

const conn = mongoose.createConnection(MONGO_URI);

// connect 하는 부분
const mongoConnect = () => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  if (process.env.NODE_ENV === 'test') {
    new MongoMemoryServer().getConnectionString()
      .then((url) =>{
        return mongoose.connect(url);
      })
      .then(console.log('Connected Memory mongo server'))
      .catch((e)=>{
        console.error(e);
      });
  } else {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('Connected mongo server'))
      .catch((e) => {
        console.error(e);
      });
  }
};

const mongoDisConnect = () => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected mongo server'))
    .catch((e) => {
      console.error(e);
    });
};

export {conn, mongoConnect, mongoDisConnect};
