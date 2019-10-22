import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

import mongoDB from '../../../../src/config/mongo/db';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';


describe('`db.spec.js`', () => {

  let mongoServer;
  let client;

  const opts = { useNewUrlParser: true, useUnifiedTopology: true };

  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();

    client = new MongoClient(mongoUri, opts);
  });

  after(async () => {
    await client.close();
    await mongoServer.stop();
  });

  describe('TEST 환경에서 사용할 Memory DB 연결 테스트', () => {
    it('mongodb-memory-server 연결하기', () => {

      return new Promise(async (resolve) => {

        try {
          await client.connect();

          const db = client.db();

          db.collection('users').insertOne(
            {
              email: 'testemail',
              name: 'testname',
            }
          ).then((result) => {
            assert.equal(result.ops[0].email, 'testemail');
            assert.equal(result.ops[0].name, 'testname');
          }).catch((err) => { throw err; });

        } catch (err) {
          throw new Error('Memory Mongo Test ' + err.stack);
        }

        client.close();
        resolve();
      });

    });
  });

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

    it('db connection 체크', () => {

      return new Promise(async (resolve) => {

        DB_ENV = (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;

        try {
          client = await mongoDB.client();
          db = client.db(DB_ENV);
          collection = db.collection('log');

          assert.equal(collection.s.namespace.db, DB_ENV);
          assert.equal(collection.s.namespace.collection, 'log');
        } catch (err) {
          try {
            throw new Error(`TEST_MONGODB_CLIENT ` + err);
          } finally {
            client.close();
          }
        } finally {
          client.close();
        }

        resolve();
      });
    });
  });

});