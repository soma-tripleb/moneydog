import '@babel/polyfill';

import assert from 'assert';
import request from 'supertest';
const app = require('../../app');

describe('auth controller test', () => {

  it('로그인', (done) => {
    request(app)
      .post('/auth/signIn')
      .send({
        userInfo: {
          email: 'admin@fkii.org',
          password: '1234',
        },
      })
      .end((err, res) => {
        if (err) return done(err);
        else {
          console.log(res.body);
          done();
        }
      });
  });
});
