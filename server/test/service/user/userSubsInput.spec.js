import assert from 'assert';

import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';

import UserSchema from '../../../src/schemas/user';

import BadUserInfo from '../../mock/user/badUserMock';
import GoodUserInfo from '../../mock/user/userMock';

describe('구독 서비스 정보를 입력 받은 사용자 데이터', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('사용자 데이터 검증하기', () => {
    const email = 'dudrnxps1@gmail.com';

    const BadUserSubsSchema = new UserSchema.Subscription(BadUserInfo.Subscription);

    const GoodUserSubsSchema = new UserSchema.Subscription(GoodUserInfo.Subscription);

    const BadUserSubsSchemaList = () => {
      const tempList = [];

      BadUserInfo.Subscriptions.some((subs) => {
        tempList.push(new UserSchema.Subscription(subs));
      });

      return tempList;
    };

    const GoodUserManySubsSchema = () => {
      const tempList = [];

      GoodUserInfo.Subscriptions.map((subs) => {
        tempList.push(new UserSchema.Subscription(subs));
      });

      return tempList;
    };

    describe('#validation() - fail', () => {
      it('(실패 - price: null) `Subscription` 스키마 유효성 검사', (done) => {
        const schemaValidation = BadUserSubsSchema.validateSync();

        assert.equal(schemaValidation.errors['price'], 'Path `price` is required.');

        done();
      });
    });

    describe('#validation() - success', () => {
      it('(성공 - 1개) 스키마 유효성 검사 후 저장', (done) => {
        const schemaValidation = GoodUserSubsSchema.validateSync();

        assert.equal(schemaValidation, undefined);

        UserSchema.User.updateOne(
          { email: email},
          { subscription: GoodUserSubsSchema},
          { runValidators: true }
        ).then((result) => {
          assert.equal(result.n, 1);
          assert.equal(result.nModified, 1);
          assert.equal(result.ok, 1);

          done();
        }).catch((err) => {
          throw done(err);
        });
      });
    });

    describe('#validation() - fail', () => {
      it('(실패 - 여러개, price & payment: null) 스키마 유효성 검사', (done) => {
        const errList = [];

        BadUserSubsSchemaList().map((subs) => {
          const validError = subs.validateSync();

          if (validError !== undefined) {
            if (validError.errors['seq']) {
              assert.equal(validError.errors['seq'], 'Path `paymentDate` is required.');

              errList.push(validError.errors['seq']);
            }
            if (validError.errors['name']) {
              assert.equal(validError.errors['name'], 'Path `name` is required.');

              errList.push(validError.errors['name']);
            }
            if (validError.errors['price']) {
              assert.equal(validError.errors['price'], 'Path `price` is required.');

              errList.push(validError.errors['price']);
            }
            if (validError.errors['paymentDate']) {
              assert.equal(validError.errors['paymentDate'], 'Path `paymentDate` is required.');

              errList.push(validError.errors['paymentDate']);
            }
            if (validError.errors['channel']) {
              assert.ok(validError.errors['channel']);

              errList.push(validError.errors['channel']);
            }
          }
        });

        console.log(errList.length);

        done();
      });
    });

    describe('#validation() - success', () => {
      it('(성공 - 여러개) 스키마 유효성 검사 후 저장', (done) => {
        UserSchema.User.updateMany(
          { email: email},
          { subscription: GoodUserInfo.Subscriptions },
          { runValidators: true},
        ).then((result) => {
          assert.equal(result.n, 1);
          assert.equal(result.nModified, 1);
          assert.equal(result.ok, 1);

          done();
        }).catch((err) => {
          throw done(err);
        });
      });
    });
  });
});

