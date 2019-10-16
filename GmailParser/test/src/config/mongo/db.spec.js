import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';

import mongoDB from '../../../../src/config/mongo/db';

dotenv.config();

describe('`db.spec.js`', () => {

  let PRODUCTION_DB_URL;
  let DEVELOPMENT_DB_URL;
  let TEST_DB_URL;

  before(() => {
    PRODUCTION_DB_URL = process.env.PROD_DB_URL;
    DEVELOPMENT_DB_URL = process.env.DEV_DB_URL;
    TEST_DB_URL = process.env.TEST_DB_URL;
  });

  describe('Connection Info 확인', () => {
    it('`.env` 파일 설정 정보 체크', () => {

      return new Promise((resolve) => {

        assert.equal(PRODUCTION_DB_URL, 'moneydog-test-p9fsb.mongodb.net/prod?retryWrites=true&w=majority');
        assert.equal(DEVELOPMENT_DB_URL, 'moneydog-test-p9fsb.mongodb.net/dev?retryWrites=true&w=majority');
        assert.equal(TEST_DB_URL, 'moneydog-test-p9fsb.mongodb.net/test?retryWrites=true&w=majority');

        assert.ok(true);
        resolve();
      });
    });
  });

  describe('MongoDB Connection', () => {

    let DB_ENV;
    let client;
    let db;
    let collection;

    before(async () => {

      DB_ENV = (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;

      try {
        client = await mongoDB.client();
        db = client.db(DB_ENV);
        collection = db.collection('log');
      } catch (err) {
        try {
          throw new Error(`TEST_MONGODB_CLIENT ` + err);
        } finally {
          client.close();
        }
      } finally {
        client.close();
      }

    });

    it('db connection 체크', () => {

      return new Promise((resolve) => {

        assert.equal(collection.s.namespace.db, DB_ENV);
        assert.equal(collection.s.namespace.collection, 'log');

        assert.ok(true);
        resolve();
      });
    });
  });

});