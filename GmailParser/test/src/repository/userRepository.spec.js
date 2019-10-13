import '@babel/polyfill';

import assert from 'assert';

import { MongoClient } from 'mongodb';
import DBConfig from '../../src/config/mongo/db';

describe('User Resporitory', () => {

  describe('회원 정보 가져오기', () => {
    it('#getAll', (done) => {
      MongoClient.connect(DBConfig.info().url, DBConfig.info().options, (err, client) => {
        if (err) throw done(err);

        const db = client.db('test');
        const cursor = db.collection('users').find({});

        function iterateFunc(doc) {
          console.log(JSON.stringify(doc, null, 4));
        }

        function errorFunc(error) {
          console.log(error);
        }

        cursor.forEach(iterateFunc, errorFunc);

        done();
      }
      );
    });
  });
});