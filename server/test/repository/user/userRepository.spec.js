import 'babel-polyfill';
import assert from 'assert';

import User from '../../../src/schemas/user';
import UserRepository from '../../../src/router/user/userRepository';
import { mongoConnect, mongoDisConnect } from '../../../src/dbConfig/mongoDB';

import UserMock from '../../mock/userMock';

describe('UserRepository Test', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('Database connect', () => {
    describe('#delete()', () => {
      it('테스트 전, Mock User id 제거', (done) => {
        const userId = UserMock.email;
        User.deleteOne({ email: userId }, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });

    describe('#create()', () => {
      it('UserMock 으로 User 생성', (done) => {
        const userResult = User.create((UserMock))
          .then((result) => {
            return result;
          })
          .catch((err) => {
            throw err;
          });

        User.find({ nickname: userResult.nickname })
          .then((result) => {
            assert.equal(result.nickname, userResult.nickname);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#find()', () => {
      it('User Id 로 User 검색', (done) => {
        const userId = UserMock.email;
        User.findOne({ email: userId }, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });

    describe('#modify()', () => {
      it('User nickname 수정', (done) => {
        const userId = UserMock.email;
        const newNickname = 'test-user2';
        User.updateOne({ email: userId }, { nickname: newNickname }, (err) => {
          if (err) done(err);
          else done(err);
        });
        User.findOne({ email: userId }, (err) => {
          if (err) err;
          else err;
        }).then((user) => {
          assert(user.nickname, newNickname);
        });
      });
    });

    describe('#findAll()', () => {
      it('User 전체 조회', (done) => {
        User.find({}, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });

    describe('#findByUserEmailToSubscription()', () => {
      it('User Id 로 User 검색 후 subscription 검색', (done) => {
        const userId = UserMock.email;
        User.findOne({ email: userId }, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });

    describe('#findAllUsers()', () => {
      it('UserRepository Method', (done) => {
        UserRepository.findAllUsers().then((user) => {
          done();
        }).catch((done) => {
          if (err) done(err);
        });
      });
    });
  });
});
