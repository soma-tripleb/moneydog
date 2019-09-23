// import 'babel-polyfill';
//
// import request from 'supertest';
// import {assert, expect} from 'chai';
// import {conn, mongoConnect, mongoDisConnect} from '../../src/configs/mongoDB';
//
// import app from '../../app';
// import authRepository from '../../src/router/auth/authRepository';
//
// describe('POST /signup', () => {
//   it('회원가입하기', (done) => {
//     console.log('signup start');
//     request(app)
//       .post('/auth/signUp')
//       .send({userInfo: {
//         email: 'test@email.com',
//         username: 'test subscription',
//         password: 'helloworld!',
//         content: 'test content',
//       }})
//       .expect(201);
//     const subscription = authRepository.getUserByEmail('test@email.com');
//     subscription
//       .then((data) => {
//         console.log('subscription info : ', data);
//       })
//       .catch((e) => {
//         console.error('subscription can not find');
//       });
//     done();
//   });
//
//   it('# userFindAll()', () => {
//     const users = authRepository.findAllUser();
//     users
//       .then((users) => {
//         console.log(`users : ${users}`);
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   });
// });
