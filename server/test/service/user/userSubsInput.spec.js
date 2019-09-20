import 'babel-polyfill';
import assert from 'assert';

import { mongoConnect, mongoDisConnect } from '../../../src/dbConfig/mongoDB';
import User from '../../../src/schemas/user';
import UserRepository from '../../../src/router/user/userRepository';
import Subscription from '../../mock/subscription';


const userInputList = [
  { seq: 4, name: 'Bugs', price: 'dsadsa', paymentDate: '', channel: '' },
  { seq: 5, name: 'Flo', price: 'dsadsa', paymentDate: '', channel: '' },
  { seq: 6, name: 'Melon', price: 'dsa', paymentDate: '', channel: '' },
];

describe('구독 서비스 정보를 입력 받은 사용자 데이터', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('사용자 데이터 검증하기', () => {
    describe('#validation()', () => {
      it('이름, 결제금액, 결제가격, 결제채널 확인', (done) => {
        const subs = new Subscription(userInputList[0]);

        console.log(subs);

        done();
      });
    });
  });
});

