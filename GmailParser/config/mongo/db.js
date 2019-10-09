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

const connect = () => {
  console.log(URL);
  MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(err);
    else {
      console.log('connected:'+db);
      const db = client.db('test');
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
};

export default {
  connect,
};