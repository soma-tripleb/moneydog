import '@babel/polyfill';

import assert from 'assert';

import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('`userQuery.spec.js', () => {

  let mongoServer;
  let client;
  let db;
  const dbName = 'test';

  const opts = { useNewUrlParser: true, useUnifiedTopology: true };

  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();

    client = new MongoClient(mongoUri, opts);

    await client.connect();
    db = client.db();
  });

  after(async () => {
    await client.close();
    await mongoServer.stop();
  });

  describe('mongoDB CRUD 테스트 하기', () => {
    it('#create', async () => {

      return db.collection(dbName).insertOne({ name: 'test_name' })
        .then((result) => {
          assert.equal(result.insertedCount, 1);
        })
        .catch((err) => { throw err.stack; });

    });

    it('#findOne', async () => {

      return db.collection(dbName).findOne({ name: 'test_name' })
        .then((result) => {
          assert.equal(result.name, 'test_name');
        })
        .catch((err) => { throw err.stack; });

    });

    it('#updateOne', async () => {

      return db.collection(dbName).updateOne({ name: 'test_name' }, { $set: { name: 'test_name2' } })
        .then((result) => {
          assert.equal(result.modifiedCount, 1);
        })
        .catch((err) => { throw err.stack; });

    });

    it('#upsertOne', async () => {

      return db.collection(dbName).updateOne({ name: 'test_name' }, { $set: { name: 'test_name' } }, { upsert: true })
        .then((result) => {
          assert.equal(result.matchedCount, 0);
          assert.equal(result.upsertedCount, 1);
        })
        .catch((err) => { throw err.stack; });

    });

    it('#delteOne', async () => {

      try {
        const r1 = await db.collection(dbName).deleteMany({ name: 'test_name' });
        const r2 = await db.collection(dbName).deleteMany({ name: 'test_name2' });

        assert.equal(1, r1.deletedCount);
        assert.equal(1, r2.deletedCount);
      } catch (err) {
        throw err.stack;
      }

    });
  });

  describe('mongoDB CRUD 테스트 하기 (실패 시)', () => {
    it('#findOne', async () => {

      try {
        const r = await db.collection(dbName).findOne({ name: 'test_name' });

        assert.equal(null, r);
      } catch (err) {
        throw err.stack;
      }

    });
  });

});