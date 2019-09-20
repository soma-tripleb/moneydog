import 'babel-polyfill';
import assert from 'assert';

import User from '../../../src/schemas/user';
import Subscription from '../../mock/subscription';
import PricePlan from '../../mock/pricePlan';

import { mongoConnect, mongoDisConnect } from '../../../src/dbConfig/mongoDB';

const subsTmplPricePlan = {
  title: '1개월 이용권',
  price: 99999,
  period: '1개월',
};

const userInputList = [
  { seq: 4, name: 'Bugs', price: 99999, paymentDate: '', channel: '', pricePlan: subsTmplPricePlan },
  { seq: 5, name: 'Flo', price: 99999, paymentDate: '', channel: '', pricePlan: subsTmplPricePlan },
  { seq: 6, name: 'Melon', price: 99999, paymentDate: '', channel: '', pricePlan: subsTmplPricePlan },
];

describe('User, SubscriptionTemplate', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('사용자 정보 가져와서 구독 서비스 정보 업데이트', () => {
    describe('#update()', () => {
      it('', (done) => {
        User.updateMany(
          { email: 'jaeyeon93@naver.com' },
          { subscription: userInputList },
        ).then((result) => {
          console.log(result);
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    // describe('#findAndModify()', () => {
    //   it('', (done) => {
    //     const email = 'admin@fkii.org';

    //     User.findByIdAndUpdate({
    //       query: { email: email },
    //       update: { subscription: userInputList },
    //       upsert: true,
    //     }).then((result) => {
    //       console.log(result);
    //       done();
    //     }).catch((err) => {
    //       done(err);
    //     });
    //   });
    // });
  });
});

