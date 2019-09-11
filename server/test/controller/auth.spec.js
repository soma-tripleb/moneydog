// import 'babel-polyfill';
//
// import request from 'supertest';
// import {assert, expect} from 'chai';
// import {conn, mongoConnect, mongoDisConnect} from '../../src/dbConfig/mongoDB';
//
// import app from '../../app';
// import {getUserByEmail} from '../../src/router/auth/authRepository';
//
// describe('POST /signup', () => {
//   it('회원가입하기', () => {
//     request(app)
//       .post('/auth/signUp')
//       .send({userInfo: {
//         email: 'test@email.com',
//         username: 'test user',
//         password: 'helloworld!',
//         content: 'test content',
//       }})
//       .expect(200);
//     const user = getUserByEmail('test@email.com');
//     user
//       .then((data) => {
//         console.log('user : ', data);
//       })
//       .catch((e) => {
//         console.error('user can not find');
//       });
//   });
//   after(() => {
//     mongoDisConnect();
//   });
// })
