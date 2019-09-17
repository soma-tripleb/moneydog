import 'babel-polyfill';

import request from 'supertest';
import {assert, expect} from 'chai';
import {mongoConnect, mongoDisConnect} from '../src/configs/mongoDB';

import app from '../app';

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
});

describe('User Api Test', ()=>{
  before((done)=>{
    mongoConnect();
    done();
  });

  after(()=>{
    mongoDisConnect();
  });


  it('Get /users 는 ', (done)=>{
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) =>{
        console.log(res.body);
        done();
      });
  });
});


describe('GET /', () => {
  it('GET /users', () => {
    request(app)
      .get('/users')
      .expect(200);
  });

  it('GET /users/jimmyjaeyeon@gmail.com', (done) => {
    request(app)
      .get('/users/jimmyjaeyeon@gmail.com')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return;
        }
        const result = res.body;
        assert.strictEqual(result.name, 'jimmy');
        assert.strictEqual(result.subscriptions[0].name, 'netflix');
      });
  });
});
