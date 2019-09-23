import 'babel-polyfill';
import assert from 'assert';

import { mongoConnect, mongoDisConnect } from '../../../src/dbConfig/mongoDB';
import User from '../../../src/schemas/user';
import UserRepository from '../../../src/router/user/userRepository';
import Subscription from '../../mock/subscription';
import UserSubsInfo from '../../mock/subsTmpl/subsTmplMock';
import userService from '../../../src/router/user/userService';

describe('구독 서비스 정보를 입력 받은 사용자 데이터', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('사용자 데이터 검증하기', () => {

    const email = 'jaeyeon93@naver.com';

    describe('#validation()', () => {
      it('이름, 결제금액, 결제가격, 결제채널 확인', (done, err) => {
        const subs = new Subscription(UserSubsInfo[0]);
        
        if (err) throw done(err);
        else done();
      });
    });

    describe('#update()', () => {
      it('사용자 정보 업데이트 하고 확인 하기', (done) => {
        const updateResult = () => {
          return UserRepository.updateMany(email, UserSubsInfo);
        };

        updateResult()
          .then((result) => {
            if (result.success === true) {
              userService.getUser(email).then((result) => console.log(result)).catch((err) => {
                throw err;
              });
            };

            done();
          })
          .catch((err) => {
            throw done(err);
          });
      });
    });
  });
});

