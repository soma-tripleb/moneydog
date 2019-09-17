import {mongoConnect, mongoDisConnect} from '../../../src/dbConfig/mongoDB';

require('dotenv').config();
import 'babel-polyfill';

import UserMock from '../../mock/userMock';
import {expect} from 'chai';
import userRepository from '../../../src/router/user/userRepository';

describe('#UserRepository Test', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  // beforeEach((done) => {
  //   userRepository.deleteAllUser()
  //     .then(() => {
  //       userRepository.createUser(UserMock)
  //         .then(() => done());
  //     });
  // });

  it('#create', async () => {
    const createUser = {
      email: 'jimmy@naver.com',
      password: '1234',
      nickname: 'jimmy',
      salt: 111,
      role: 'user',
      subscription: {
        name: 'netflix',
        price: 14000,
        channel: 'ios',
        pricePlan: {
          title: 'premium',
          price: 14000,
          period: '1',
        },
      },
    };
    const user = await userRepository.saveOne(createUser);
    expect(user.email).to.equal('jimmy@naver.com');
    expect(user.password).to.equal('1234');
    const subscription = user.subscription;
    expect(subscription.name).to.equal('netflix');
  });

  it('#read user', async () => {
    const user = await userRepository.getUserByEmail('test@test.com');
    expect(user.email).to.equal('test@test.com');
    expect(user.password).to.equal('1234');
    const subscription = user.subscription;
    expect(subscription.name).to.equal('test-title');
  });
  it('#delete user', async () => {
    await userRepository.deleteUserByEmail('test@test.com');
    const user = await userRepository.getUserByEmail('test@test.com');
    expect(user).be.equal(null);
  });
  it('#find all', async () => {
    const createUser = {
      email: 'jimmy@naver.com',
      password: '1234',
      nickname: 'jimmy',
      salt: 111,
      role: 'user',
      subscription: {
        name: 'netflix',
        price: 14000,
        channel: 'ios',
        pricePlan: {
          title: 'premium',
          price: 14000,
        },
      },
    };
    await userRepository.createUser(createUser);
    const users = await userRepository.getUserList();
    expect(users[1].email).to.equal('jimmy@naver.com');
    expect(users[1].password).to.equal('1234');
    const subscription = users[1].subscription;
    expect(subscription.name).to.equal('netflix');
    expect(users.length).be.equal(2);
  });
});
