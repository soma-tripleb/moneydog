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
<<<<<<< HEAD:server/src/configs/mongoDB.js
  if (process.env.NODE_ENV === 'test') {
    new MongoMemoryServer().getConnectionString()
      .then((url) =>{
        return mongoose.connect(url);
      })
      .then(console.log('Connected Memory mongo server'))
      .catch((e)=>{
        console.error(e);
      });
=======

  console.log('node env : ', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'test') {
    // test환경에 대한 mongo-memory-server코드를 차후 작성예정
>>>>>>> #51, 하위 컴포넌트 결과값 상위 컴포넌트에서 합치기:server/src/dbConfig/mongoDB.js
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
