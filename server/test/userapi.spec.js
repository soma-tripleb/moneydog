import 'babel-polyfill';
import request from 'supertest';
import {expect, assert} from 'chai';
import app from '../app';

describe('GET /', () => {
  it('GET /users', () => {
    request(app)
      .get('/users')
      .expect(200);
  });

  it('GET /users/jimmyjaeyeon@gmail.com', (done) => {
    request(app)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        console.log(res);
      });
  });
});
