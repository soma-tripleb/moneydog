import 'babel-polyfill';
import assert from 'assert';

import { mongoConnect, mongoDisConnect } from '../../../src/dbConfig/mongoDB';
import UserRepository from '../../../src/router/user/userRepository';
import UserMock from '../../mock/userMock';

describe('UserRepository Service Test', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('Repository Method', () => {
    describe('#delete()', ()=> {
      it('사용자 이메일로 정보 삭제(mock)', (done) => {
        const userEmail = UserMock.email;
        UserRepository.deleteOne(userEmail)
          .then((result) => {
            assert.equal(result.success, true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#create()', () => {
      it('사용자 정보 등록(mock)', (done) => {
        UserRepository.saveOne(UserMock)
          .then((result) => {
            assert.equal(result.success, true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#findOne()', () => {
      it('이메일로 사용자 검색(mock)', (done) => {
        UserRepository.findOne(UserMock.email)
          .then((result) => {
            assert.equal(result.success, true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#findAll()', () => {
      it('모든 사용자 검색', (done) => {
        UserRepository.findAll()
          .then((result) => {
            assert.equal(result.success, true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});

