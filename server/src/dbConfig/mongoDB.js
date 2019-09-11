require('dotenv').config();

import mongoose from 'mongoose';

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

const conn = mongoose.createConnection(MONGO_URI);

// connect 하는 부분
const mongoConnect = () => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  if (process.env.NODE_ENV === 'test') {
    // test환경에 대한 mongo-memory-server코드를 차후 작성예정

    // const mongoServer = new MongoMemoryServer();
    // mongoose.Promise = Promise;
    // mongoServer.getConnectionString().then((MONGO_URI) => {
    //   return mongoose.connect(MONGO_URI, (err) => {
    //     if (err) {
    //       done(err);
    //     }
    //   });
    // });
  } else {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('Connected mongo server'))
      .catch((e) => {
        console.error(e);
      });
  }
};

// mongo 연결 해제 부분
const mongoDisConnect = () => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected mongo server'))
    .catch((e) => {
      console.error(e);
    });
};

export {conn, mongoConnect, mongoDisConnect};
