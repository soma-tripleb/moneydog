import '@babel/polyfill';
import request from 'supertest';
import {mongoConnect, mongoDisConnect} from '../../../src/config/mongoDB';
import app from '../../../app';

describe('Subscription Template Controller Test', () => {
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
