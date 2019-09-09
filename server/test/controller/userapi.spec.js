import 'babel-polyfill';

import request from 'supertest';
import {assert} from 'chai';
import app from '../../app';

describe('Test suite', ()=>{
  it('should be ok', ()=>{
    assert.equal(true, true);
  });
});

describe('Index Api Test', ()=>{
  it('GET / 는', (done)=>{
    request(app)
      .get('/')
      .end((err, res)=>{
        console.log('body' + res.body);
        done();
      });
  });
});


// describe('GET /', () => {
//   it('GET /users', () => {
//     request(app)
//       .get('/users')
//       .expect(200);
//   });
//
//   it('GET /users/jimmyjaeyeon@gmail.com', (done) => {
//     request(app)
//       .get('/users/jimmyjaeyeon@gmail.com')
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           return;
//         }
//         const result = res.body;
//         assert.strictEqual(result.name, 'jimmy');
//         assert.strictEqual(result.subscriptions[0].name, 'netflix');
//       });
//   });
// });
