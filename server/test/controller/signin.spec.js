import 'babel-polyfill';

import request from 'supertest';
import app from '../../app';

describe('POST /users/signIn', () => {
  it('로그인', (done) => {
    request(app)
      .post('/users/signIn')
      .send({
        userInfo: {
          email: 'admin@fkii.org',
          passowd: '1234',
        },
      })
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});
