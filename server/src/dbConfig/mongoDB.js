require('dotenv').config();

import mongoose from 'mongoose';
import { MongoMemoryServer} from 'mongodb-memory-server';

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

const conn = mongoose.createConnection(MONGO_URI);

// connect 하는 부분
const mongoConnect = () => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  if (process.env.NODE_ENV === 'test') {
    // const Mockgoose = require('mockgoose').Mockgoose;
    // const mockgoose = new Mockgoose(mongoose);
    // mockgoose.prepareStorage()
    //   .then(() => {
    //     mongoose.connect(MONGO_URI)
    //       .then(() => console.log('Connected test mongo db using mockgoose'))
    //       .catch((e) => {
    //         console.error(`mockgoose error 발생 : ${e}`);
    //       });
    //   });
    const mongoServer = new MongoMemoryServer();
    mongoose.Promise = Promise;
    mongoServer.getConnectionString().then((MONGO_URI) => {
      const mongooseOpts = {
        // options for mongoose 4.11.3 and above
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      };
      mongoose.connect(MONGO_URI, mongooseOpts);
      mongooose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEOUT') {
          console.log(e);
          mongoose.connect(MONGO_URI, mongooseOpts);
        }
        console.log(e);
      });
      mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${MONGO_URI}`);
      });
    });
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
