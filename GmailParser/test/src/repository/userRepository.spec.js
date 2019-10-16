import '@babel/polyfill';

import assert from 'assert';

import mongoDB from '../../../src/config/mongo/db';
import Mock from '../../resources/mock/user.spac';

import GmailApi from '../../../src/util/gmailApi';

describe('`userRepository.spec.js', () => {

  const TEST_USER = 'test@test.com';

  describe('`DELTE` / `INSERT` / `UPDATE`', () => {

    let DB_ENV;
    let client;
    let db;
    let collection;

    beforeEach(async () => {

      DB_ENV = (process.env.NODE_ENV === undefined) ? 'test' : undefined;

      try {
        client = await mongoDB.client();
        db = client.db(DB_ENV);
      } catch (err) {
        try {
          throw new Error(`TEST_USERREPO_CLIENT ` + err);
        } finally {
          client.close();
        }
      }

      try {
        collection = db.collection('users');
      } catch (err) {
        throw new Error(`TEST_USERREPO_COLLECTION ` + err);
      }

    });

    afterEach(() => {
      client.close();
    });

    describe('회원 삭제 하기 (UserMock)', () => {
      it('#deleteOne', () => {

        return collection.deleteOne({ email: TEST_USER })
          .then((result) => {

            assert.equal(result.result.n, 1);
            assert.equal(result.deletedCount, 1);

          })
          .catch((err) => {
            throw new Error(`TEST_USER_DB_DELETE_ONE ` + err);
          })
          .finally(() => {
            client.close();
          });

      });
    });

    describe('회원 등록 하기 (UserMock)', () => {
      it('#insertOne', () => {

        return collection.insertOne(Mock.UserMock)
          .then((result) => {

            assert.equal(result.result.n, 1);
            assert.equal(result.ops.length, 1);

          })
          .catch((err) => {
            throw new Error(`TEST_USERREPO_INSERT_ONE ` + err);
          })
          .finally(() => {
            client.close();
          });

      });
    });

    describe('회원 정보 가져오기 (UserMock)', () => {
      it('#getAll', () => {

        return collection.findOne({ email: TEST_USER })
          .then((result) => {

            assert.equal(result.email, TEST_USER);

          })
          .catch((err) => {
            throw new Error(`TEST_USERREPO_FIND_ONE ` + err);
          })
          .finally(() => {
            client.close();
          });

      });
    });

  });

  describe('사용자의 refresh_token 얻어오기 (UserMock)', () => {
    it('#getRefreshToken', () => {

      return new Promise(async (resolve) => {
        let result;

        try {
          result = await GmailApi.getRefreshToken(TEST_USER);

          assert.equal(process.env.REFRESH_TOKEN_SAMPLE, result);

        } catch (err) {
          throw new Error(`TEST_USERREPO_GET_REFRESH_TOKEN` + err);
        }

        resolve();
      });

    });
  });

});