import 'babel-polyfill';

import request from 'supertest';
import {assert, expect} from 'chai';
import {mongoConnect, mongoDisConnect} from '../../src/dbConfig/mongoDB';

import app from '../../app';

describe('POST /signup', () => {
  it('회원가입하기', () => {
    request(app)
      .post('/auth/signUp')
      .send({userInfo: {
        email: 'test@email.com',
        username: 'test user',
        password: 'helloworld!',
        content: 'test content',
      }})
      .expect(200);
  });
  after(() => {
    mongoDisConnect();
  });
})
