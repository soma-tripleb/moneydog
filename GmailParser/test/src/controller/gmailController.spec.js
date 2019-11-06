import request from 'supertest';

describe('GET /gmail/messages/id는', () => {
  it('성공시', (done) => {
    request(app)
      .get('/gmail/messages/id/dudrnxps1@gmail.com')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        console.log(res.body);
        done();
      });
  });
});