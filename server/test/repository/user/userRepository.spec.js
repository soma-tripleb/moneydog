import {mongoConnect, mongoDisConnect} from '../../../src/configs/mongoDB';

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
    const user = await userRepository.findOne('test@test.com');
    expect(user.email).to.equal('test@test.com');
    expect(user.password).to.equal('1234');
    const subscription = user.subscription;
    expect(subscription.name).to.equal('test-title');
  });

  it('#delete user', async () => {
    await userRepository.deleteOne('test@test.com');
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
  });
});
