import '@babel/polyfill';

import assert from 'assert';
import request from 'supertest';

import express from 'express';
import index from '../../index';

const app = express();

describe('INDEX page TEST', () => {
  before(() => {
    app.use(express.json());
    app.use('/', index);
  });

  describe('GET /', () => {
    it('token 발급', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', 'application/json')
        .end((err, res) => {
          if (err) return done(err);
          else {
            assert.equal(res.body.data.success, true);
            done();
          }
        });
    });
  });

});

