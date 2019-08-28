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

  it('GET /users/jimmyjaeyeon@gmail.com', () => {
    request(app)
      .get('/users/jimmyjaeyeon@gmail.com')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return;
        }
        const result = res.body[0];
        console.log(result);
      });
  });
});
