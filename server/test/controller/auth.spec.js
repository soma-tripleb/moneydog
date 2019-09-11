import 'babel-polyfill';

import request from 'supertest';
import {assert, expect} from 'chai';
import {conn, mongoConnect, mongoDisConnect} from '../../src/dbConfig/mongoDB';

import app from '../../app';
import authRepository from '../../src/router/auth/authRepository';

describe('POST /signup', () => {
  it('회원가입하기', (done) => {
    console.log('signup start');
    request(app)
      .post('/auth/signUp')
      .send({userInfo: {
        email: 'test@email.com',
        username: 'test user',
        password: 'helloworld!',
        content: 'test content',
      }})
      .expect(201);
    const user = authRepository.getUserByEmail('test@email.com');
    user
      .then((data) => {
        console.log('user info : ', data);
      })
      .catch((e) => {
        console.error('user can not find');
      });
    done();
  });

  it('# userFindAll()', () => {
    const users = authRepository.findAllUser();
    users
      .then((users) => {
        console.log(`users : ${users}`);
      })
      .catch((e) => {
        console.error(e);
      });
  });
});
