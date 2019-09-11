import 'babel-polyfill';

import request from 'supertest';
import {assert, expect} from 'chai';
import {mongoConnect, mongoDisConnect} from '../../src/dbConfig/mongoDB';

import app from '../../app';

describe('GET /', () => {
  it('should respond with Json message "MoneyDog Server API"', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done();
          return;
        }
        expect(res.body.message).to.equal('MoneyDog Server API');
        done();
      });
  });
  after(() => {
    mongoDisConnect();
  });
});

describe('User Api Test', ()=>{
  it('GET /users', (done)=>{
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) =>{
        console.log(res.body);
        done();
      });
  });
  after(()=>{
    mongoDisConnect();
  });
});
