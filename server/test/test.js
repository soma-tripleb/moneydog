const request = require('request');
const expect = require('chai').expect;

describe('GET http://jsomobject.com', ()=>{
  it('200을 리턴 해야한다.', (done)=>{
    request.get('http://jsonobject.com', (err, res, body)=>{
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

