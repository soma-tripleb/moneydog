import '@babel/polyfill';

import chai from 'chai';
import request from 'supertest';
import {deleteOne} from '../../src/router/user/userRepository';
const app = require('../../app');
const expect = chai.expect;

describe('auth controller test', () => {

  after(()=>{
    deleteOne('admin@fkii.org');
  });

  describe('POST /auth/signUp TEST CASE', () => {

    it('userInfo 없이 회원가입을 시도하면 400 error 를 내보낸다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success']);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('userInfo 정보가 부족합니다!');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('userInfo 중 nickname, key, password 가 없이 회원가입을 시도하면 없는 키를 알려준다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .send({
          userInfo: {
            email: 'admin@fkii.org',
          }
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success']);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('userInfo 정보가 부족합니다!');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('userInfo의 password 가 8자리 ~ 20자리 사이인지 검사한다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .send({
          userInfo: {
            email: 'admin@fkii.org',
            password: '1234',
            nickname: 'admin',
          }
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success']);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('8자리 ~ 20자리 이내로 입력해주세요.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('userInfo의 password 에 공백이 있는지 검사한다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .send({
          userInfo: {email: 'admin@fkii.org', password: '1234 5678', nickname: 'admin'}
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success']);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('비밀번호는 공백업이 입력해주세요.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('userInfo의 password 에 특수문자, 영문, 숫자가 포함 되어 있는지 확인한다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .send({
          userInfo: {email: 'admin@fkii.org', password: '123456789', nickname: 'admin'}
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success']);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('영문,숫자, 특수문자를 혼합하여 입력해주세요.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('회원 가입에 드디어 성공을 했다. token 을 받는지 확인한다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .send({
          userInfo: {email: 'admin@fkii.org', password: '!qwer1234', nickname: 'admin'}
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success', 'token']);
          expect(response.body.status).to.equal(201);
          expect(response.body.success).to.be.true;
          expect(response.body.message).to.equal('회원가입에 성공했습니다.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('같은 아이디로 회원가입을 시도하면 에러를 내보낸다.', (done) => {
      request(app)
        .post('/auth/signUp')
        .send({
          userInfo: {email: 'admin@fkii.org', password: '!qwer1234', nickname: 'admin'}
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys(['status', 'message', 'success']);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('이미 존재하는 아이디 입니다.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });
  });

  describe('POST /auth/signIn TEST CASE', () => {
    it('userInfo 없이 로그인 시도하면 400 error 를 내보낸다.', (done) => {
      request(app)
        .post('/auth/signIn')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys([
            'status', 'message', 'success'
          ]);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('userInfo 정보가 없습니다.!');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('userInfo에 email 또는 password 가 없다면 에러와 함꼐 알려준다.', (done) => {
      request(app)
        .post('/auth/signIn')
        .send({
          userInfo: {
            email: 'admin@fkii.org',
          }
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys([
            'status', 'message', 'success'
          ]);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('password key 가 없습니다.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('DB에 아이디가 없다면 회원이 아님을 알려준다.', (done) => {
      request(app)
        .post('/auth/signIn')
        .send({
          userInfo: {
            email: 'tjddus1109@fkii.org',
            password: '1234',
          }
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((response)=>{
          expect(response.body).has.all.keys([
            'status', 'message', 'success'
          ]);
          expect(response.body.status).to.equal(400);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('없는 아이디 입니다.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it('비밀번호가 틀리다면 409 error 를 내보낸다.', (done) => {
      request(app)
        .post('/auth/signIn')
        .send({
          userInfo: {
            email: 'admin@fkii.org',
            password: '1234',
          }
        })
        .expect('Content-Type', /json/)
        .expect(409)
        .expect((response)=>{
          expect(response.body).has.all.keys([
            'status', 'message', 'success'
          ]);
          expect(response.body.status).to.equal(409);
          expect(response.body.success).to.be.false;
          expect(response.body.message).to.equal('비밀번호가 틀렸습니다.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });

    it(' id admin@fkii.org 으로 로그인 성공 하는 테스트 token 을 반환 한다', (done) => {
      request(app)
        .post('/auth/signIn')
        .send({
          userInfo: {
            email: 'admin@fkii.org',
            password: '!qwer1234',
          }
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response)=>{
          expect(response.body).has.all.keys([
            'status', 'message', 'success', 'token'
          ]);
          expect(response.body.status).to.equal(200);
          expect(response.body.success).to.be.true;
          expect(response.body.message).to.equal('로그인에 성공 했습니다.');
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done(err);
        });
    });
  });
});
