import 'babel-polyfill';

import request from 'supertest';
import app from '../../app';

describe('POST /auth/signIn', () => {
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
        console.log(res.body);
        done();
      });
  });
});
