const request = require('supertest');
const should = require('should');
const app = require('../api/index');

describe('GET /user는', () => {
  describe('success', ()=>{
    it('유저 객체를 담은 배열로 응답한다. ', (done) => {
      request(app)
        .get('/')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it('최대  limit 갯수만큼 응답한다.', (done)=>{
      request(app)
        .get('/?limit=2')
        .end((err, res) => {
          res.body.should.have.length(2);
          done();
        });
    });
  });

  describe('failue', (done)=>{
    it('limit이 숫자가 아니면 400을 응답한다.', (done)=>{
      request(app)
        .get('/?limit=two')
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
  });
});
