require('dotenv').config();
import 'babel-polyfill';

import User from '../../src/schemas/user';
import UserMock from '../mock/userMock';
import mongoose from 'mongoose';
import {expect} from 'chai';
import { MongoMemoryServer} from 'mongodb-memory-server';
import userRepository from '../../src/router/user/userRepository';

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
      // userRepository.deleteAllUser()
      //   .then(() => userRepository.createUser(UserMock))
      //   .then((done) => done());
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
  it('#create', async () => {
    const createUser = {

    }
    const user = await userRepository.createUser(UserMock);
    expect(user.email).to.equal('test@test.com');
    expect(user.password).to.equal('1234');
    const subscription = user.subscription;
    expect(subscription.name).to.equal('test-title');
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
});

// describe('UserRepository Test', () => {
//   describe('Database connect', () => {
//     before((done) => {
//       console.log('before mongo start');
//       mongoConnect();
//       done();
//     });
//     describe('#delete()', () => {
//       it('테스트 전, Mock User id 제거', (done) => {
//         const userId = UserMock.email;
//         User.deleteOne({email: userId}, (err) => {
//           if (err) done(err);
//           else done(err);
//         });
//       });
//     });
//
//     describe('#create()', () => {
//       it('UserMock 으로 User 생성', (done) => {
//         User.create((UserMock), function(err) {
//           if (err) done(err);
//           else done();
//         });
//       });
//     });
//
//     describe('#find()', () => {
//       it('User Id 로 User 검색', (done) => {
//         const userId = UserMock.email;
//         User.findOne({email: userId}, (err) => {
//           if (err) done(err);
//           else done(err);
//         }).then((user) => {
//           console.log(user);
//         });
//       });
//     });
//
//     describe('#modify()', () => {
//       it('User nickname 수정', (done) => {
//         const userId = UserMock.email;
//         const newNickname = 'test-user2';
//         User.updateOne({email: userId}, {nickname: newNickname}, (err) => {
//           if (err) done(err);
//           else done(err);
//         });
//         User.findOne({ email: userId }, (err) => {
//           if (err) err;
//           else err;
//         }).then((user) => {
//           assert(user.nickname, newNickname);
//         });
//       });
//     });
//
//     describe('#findAll()', () => {
//       it('User 전체 조회', (done) => {
//         User.find({}, (err) => {
//           if (err) done(err);
//           else done(err);
//         }).then((users) => {
//           users.map((user) => {
//             console.log('email: ' + user.email);
//             console.log(user);
//             console.log('');
//           });
//         });
//       });
//     });
//
//     describe('#findByUserEmailToSubscription()', () => {
//       it('User Id 로 User 검색 후 subscription 검색', (done) => {
//         const userId = UserMock.email;
//         User.findOne({email: userId}, (err) => {
//           if (err) done(err);
//           else done(err);
//         }).then((user) => {
//           console.log(user.subscription);
//         });
//       });
//     });
//     after((done) => {
//       mongoDisConnect();
//       done();
//     });
//   });
// });
