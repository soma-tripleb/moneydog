import 'babel-polyfill';
import assert from 'assert';

import UserSchema from '../../../src/schemas/user';
import UserMock from '../../mock/user/userMock';
import BadUserMock from '../../mock/user/badUserMock';
import GoodUserMock from '../../mock/user/userMock';

import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';

describe('User, SubscriptionTemplate', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  const email = 'test@test.com';

  describe('DB 유효성 검사', () => {
    describe('#delete()', () => {
      it('사용자 삭제', (done) => {
        UserSchema.User.deleteOne({email: email})
          .then((result) => {
            console.log(result);
            done();
          })
          .catch((err) => {
            throw done(err);
          });
      });
    });

    describe('#shemaValidaion()', () => {
      it('에러 메세지 확인', (done) => {
        const goodUserInfo = new UserSchema.User(GoodUserMock.UserMock);
        const badUserInfo = new UserSchema.User(BadUserMock.UserMock);

        const GoodUserSubsInfo = new UserSchema.Subscription(GoodUserMock.Subscription);

        const BadUserSubsInfo = new UserSchema.Subscription(BadUserMock.Subscription);

        const error = GoodUserSubsInfo.validateSync();

        console.log(error);

        done();
      });
    });

    describe('#update()', () => {
      it('Subscription 정보 업데이트 - 실패 시', (done) => {
        const badUserSubsInfo = new UserSchema.Subscription(BadUserMock.Subscription);

        const subsError = badUserSubsInfo.validateSync();

        console.log(subsError.errors['price'].message);

        UserSchema.User.updateOne(
          { email: email },
          { subscription: badUserSubsInfo },
          { runValidators: true }
        ).then((result) => {
          console.log(result);
        }).catch((err) => {
          const priceErrorMessage = err.errors['subscription.0.price'].message;

          assert.equal(priceErrorMessage, 'Path `price` is required.');
        });

        done();
      });
    });
  });
});

