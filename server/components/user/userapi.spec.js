import request from 'supertest';
import {expect, assert} from 'chai';
import app from '../../app';

describe('GET /', () => {
  it('test', () => {
    request(app)
      .get('/users')
      .expect(200);
  });
});
