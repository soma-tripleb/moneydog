import 'babel-polyfill';
import assert from 'assert';

import UserSchema from '../../../src/schemas/user';

import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';

const subsTmplPricePlan = {
  title: '1개월 이용권',
  price: 99999,
  period: '1개월',
};

const userInputList = [
  { seq: 4, name: 'Bugs', price: 99999, paymentDate: '', channel: '' },
  { seq: 5, name: 'Flo', price: 99999, paymentDate: '', channel: '' },
  { seq: 6, name: 'Melon', price: 99999, paymentDate: '', channel: '' },
];

const userInput =
{
  seq: 4,
  name: 'Bugs',
  price: 'asd',
  paymentDate: '',
  channel: '',
};

describe('User, SubscriptionTemplate', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  const email = 'dudrnxps1@gmail.com';

  describe('사용자 정보 가져와서 구독 서비스 정보 업데이트', () => {
    describe('#update()', () => {
      it('콜백 해방', (done, err) => {
        const update = () => {
          return UserSchema.User.updateMany({email: email}, {subscription: userInputList})
            .then((result) => {
              return result;
            })
            .catch((err) => {
              throw err;
            });
        };

        update()
          .then((result) => {
            assert.equal(result.n, 1);
            assert.equal(result.nModified, 1);
            assert.equal(result.ok, 1);

            User.findOne({ email: email })
              .then((result) => {
                assert.equal(result.subscription.length, 3);
                done();
              })
              .catch((err) => {
                throw done(err);
              });
          })
          .catch((err) => {
            throw done(err);
          });
      });
    });

    describe('#update()', () => {
      it('', (done) => {
        UserSchema.User.updateMany(
          { email: 'jaeyeon93@naver.com' },
          { subscription: userInputList },
        ).then((result) => {
          UserSchema.User.findOne({ email: email })
            .then((result) => {
              // result.subscription.map((subsInfo) => {
              //   console.log(subsInfo);
              // });

              done();
            })
            .catch((err) => {
              done(err);
            });
        }).catch((err) => {
          done(err);
        });
      });
    });
  });
});

