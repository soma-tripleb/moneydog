import '@babel/polyfill';
import request from 'supertest';
import {mongoConnect, mongoDisConnect} from '../../../src/config/mongoDB';
import app from '../../../app';

describe('Subscription Template Controller Test', () => {
  before((done) => {
    request(app)
      .post('/auth/signIn')
      .send({
        userInfo: {
          email: 'admin@fkii.org',
          password: '1234',
        },
      })
      .end((err, res) => {
        if (err) done(err);
        const token = res.text.token;
        console.log(`token : ${token}`);
        done();
      });
  });
  it('GET /subs-tmpl 테스트하기', () => {
    request(app)
      .get('/subs-tmpl')
      .end((err, res) => {
        if (err) throw err;
        console.log(JSON.stringify(res));
      });
  });
  after((done) => {
    mongoDisConnect();
    done();
  });
});
