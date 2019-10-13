import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';

import mongoDB from '../../../../src/config/mongo/db';

dotenv.config();

describe('MongoDB TEST', () => {

  let PRODUCTION_DB_URL;
  let DEVELOPMENT_DB_URL;
  let TEST_DB_URL;

  before(() => {
    PRODUCTION_DB_URL = process.env.PROD_DB_URL;
    DEVELOPMENT_DB_URL = process.env.DEV_DB_URL;
    TEST_DB_URL = process.env.TEST_DB_URL;
  });

  describe('Connection Info 확인', () => {
    it('`.env` 파일 설정 정보 체크', (done) => {
      assert.equal(PRODUCTION_DB_URL, 'moneydog-test-p9fsb.mongodb.net/prod?retryWrites=true&w=majority');
      assert.equal(DEVELOPMENT_DB_URL, 'moneydog-test-p9fsb.mongodb.net/dev?retryWrites=true&w=majority');
      assert.equal(TEST_DB_URL, 'moneydog-test-p9fsb.mongodb.net/test?retryWrites=true&w=majority');

      done();
    });
  });

  describe('MongoDB Connection', () => {
    it('db connection 체크', (done) => {
      mongoDB.client()
        .then((client) => {
          const db = client.db('test');
          const collection = db.collection('log');

          assert.equal(collection.s.namespace.db, 'test');
          assert.equal(collection.s.namespace.collection, 'log');

          client.close();
          done();
        })
        .catch((err) => {
          throw done(err);
        });
    });
  });
});