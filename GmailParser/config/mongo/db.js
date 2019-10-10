import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const {
  DB_SCHEMA,
  DB_USER,
  DB_PASSWORD,
  DB_URL,
} = process.env;

const URL = DB_SCHEMA
  .concat(DB_USER).concat(':')
  .concat(DB_PASSWORD).concat('@')
  .concat(DB_URL);

class Conn {
  constructor() {
    this.strategy = {};
  };

  set setStrategy(strategy) {
    this.strategy = strategy;
  };

  conn() {
    MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
      if (err) console.log(err);
      else {
        console.log('connected:' + db);
        const dbName = this.strategy().dbName;
        const document = this.strategy().document;
        const func = this.strategy().func;

        const db = client.db(dbName);
        const collection = db.collection(document);
        
        // connection 을 어떻게 전달해 줄 것이냐.
        // func(collection);

        client.close();
      }
    });

  };

  /*
  MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(err);
    else {
      console.log('connected:'+db);
      const db = client.db('test');

      findDocuments(db, 'users');
      
      const collection = db.collection('users');

      collection.find({}).toArray((err, docs) => {
        if (err) console.log(err);
        else {
          console.log(docs);
        }
      });
      
      client.close();
    }
  });
   */
};

// const findDocuments = (collection) => {
//   collection.find({}).toArray((err, docs) => {
//     if (err) console.log(err);
//     else {
//       console.log(docs);
//     }
//   });
// };

export default {
  Conn,
  // findDocuments,
};