require('dotenv').config();
import 'babel-polyfill';

import UserMock from '../mock/userMock';
import mongoose from 'mongoose';
import {expect} from 'chai';
import { MongoMemoryServer} from 'mongodb-memory-server';
import userRepository from '../../src/router/user/userRepository';

let mongoServer;

before((done) => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then((mongoUri) => {
      return mongoose.connect(mongoUri, (err) => {
        if (err) {
          done(err);
        }
      });
    })
    .then(() => {
      console.log('mongodb-memory-server running');
      userRepository.createUser(UserMock)
        .then(() => done());
    });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('server stoped');
});

describe('#UserRepository Test', () => {
  beforeEach((done) => {
    userRepository.deleteAllUser()
      .then(() => {
        userRepository.createUser(UserMock)
          .then(() => done());
      });
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
        },
      },
    };
    const user = await userRepository.createUser(createUser);
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
