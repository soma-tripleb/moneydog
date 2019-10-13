import '@babel/polyfill';

import assert from 'assert';

import mongoDB from '../../../src/config/mongo/db';
import Mock from '../../resources/mock/user.spac';

// memory db 사용하기
describe('User Resporitory', () => {

  const useremail = 'test@test.com';

  describe('회원 삭제 하기(UserMock)', () => {
    it('#deleteOne', (done) => {
      mongoDB.client()
        .then((client) => {
          const db = client.db('test');
          const collection = db.collection('users');

          collection.deleteOne({ email: useremail })
            .then((result) => {
              assert.equal(result.result.n, 1);
              assert.equal(result.deletedCount, 1);
            })
            .catch((err) => {
              throw err;
            })
            .finally(() => {
              client.close();
            });

          done();
        })
        .catch((err) => {
          throw done(err);
        });
    });
  });

  describe('회원 등록 하기', () => {
    it('#insertOne', (done) => {
      mongoDB.client()
        .then((client) => {
          const db = client.db('test');
          const collection = db.collection('users');

          collection.insertOne(Mock.UserMock)
            .then((result) => {
              assert.equal(result.result.n, 1);
              assert.equal(result.ops.length, 1);
            })
            .catch((err) => {
              throw err;
            })
            .finally(() => {
              client.close();
            });

          done();
        })
        .catch((err) => {
          throw done(err);
        });
    });
  });

  describe('회원 정보 가져오기', () => {
    it('#getAll', (done) => {
      mongoDB.client()
        .then((client) => {
          const db = client.db('test');
          const collection = db.collection('users');

          collection.findOne({ email: useremail })
            .then((result) => {
              assert.equal(result.email, useremail);
            })
            .catch((err) => {
              throw err;
            })
            .finally(() => {
              client.close();
            });

          done();
        })
        .catch((err) => {
          throw done(err);
        });
    });
  });
});