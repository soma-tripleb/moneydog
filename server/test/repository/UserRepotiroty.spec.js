require('dotenv').config();
import 'babel-polyfill';

import UserMock from '../mock/userMock';
import mongoose from 'mongoose';
import {expect} from 'chai';
import { MongoMemoryServer} from 'mongodb-memory-server';
import userRepository from '../../src/router/user/userRepository';
import {mongoConnect} from '../../src/dbConfig/mongoDB';

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;
let mongoServer;

before((done) => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then((MONGO_URI) => {
      return mongoose.connect(MONGO_URI, (err) => {
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
    console.log('beforeEach실행');
    done();
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
    const users = await userRepository.getUserList();
    expect(users[0].email).to.equal('jimmy@naver.com');
    expect(users[0].password).to.equal('1234');
    const subscription = users[0].subscription;
    expect(subscription.name).to.equal('netflix');
  });
});
