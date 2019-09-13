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
    describe('#create()', () => {
      it('사용자 정보 등록(mock)', (done) => {
        UserRepository.createOne(UserMock)
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

