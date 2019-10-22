import assert from 'assert';

import fs from 'fs';
import path from 'path';
import AppleParser from '../../../../../src/util/parser/email/apple/appleParser';
import GoogleParser from '../../../../../src/util/parser/email/google/googleParser';
import NetflixParser from '../../../../../src/util/parser/email/netflix/netflixParser';
import WatchaParser from '../../../../../src/util/parser/email/watcha/watchaParser';

import AppleReceipt from '../../../../../src/model/dto/mail/apple';

describe('Email Parser 테스트', () => {

  describe('Apple 영수증 Parser', () => {
    it('#apple, apple-music', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/apple/appleMusicReceipt.json'), (err, data) => {
        if (err) throw err;

        const AppleMusic = new AppleReceipt();
        const result = AppleParser.getAppleInfo(data, AppleMusic);

        assert.equal('Apple Music 구독 멤버십', result.name);
      });

    });

    it('#apple, watcha', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/apple/watchaReceipt.json'), (err, data) => {
        if (err) throw err;

        const AppleWatcha = new AppleReceipt();
        const result = AppleParser.getAppleInfo(data, AppleWatcha);

        assert.equal('왓챠플레이 - WATCHA PLAY, 이용권 (자동 갱신)', result.name);
      });

    });

    it('#apple, youtube', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/apple/youtubeReceipt.json'), (err, data) => {
        if (err) throw err;

        const AppleYoutube = new AppleReceipt();
        const result = AppleParser.getAppleInfo(data, AppleYoutube);

        assert.equal('YouTube, YouTube Red (자동 갱신)', result.name);
      });

    });
  });

  describe('Google 영수증 Parser', () => {
    it('#google, watcha', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/google/gmail_response.json'), (err, data) => {
        if (err) throw err;

        const parsing = GoogleParser.getGoolgeInfo(data);

        assert.equal('왓챠플레이', parsing.name);
      });

    });
  });

  describe('구독 서비스 별 영수증 Parser', () => {
    it('#netflix, 멤버십 회원가입', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/netflix/netflix_membership_signup.json'), (err, data) => {
        if (err) throw err;

        const parsing = NetflixParser.checkStatus(data);

        assert.equal('Kimjinnam 님, 넷플릭스에 가입해 주셔서 감사합니다.', parsing.snippet);
      });

    });

    it('#netflix, 멤버십 재가입', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/netflix/netflix_restart.json'), (err, data) => {
        if (err) throw err;

        const parsing = NetflixParser.checkStatus(data);

        assert.equal('Netflix 멤버십 재시작 알림', parsing.snippet);
      });

    });

    it('#netflix, 멤버십 구독 취소', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/netflix/netflix_unsubscribe.json'), (err, data) => {
        if (err) throw err;

        const parsing = NetflixParser.checkStatus(data);

        assert.equal('아쉬운 작별 인사를 드립니다.', parsing.snippet);
      });

    });

    it('#netflix, 멤버십 업그레이드', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/netflix/netflix_upgrade.json'), (err, data) => {
        if (err) throw err;

        const parsing = NetflixParser.checkStatus(data);

        assert.equal('멤버십이 업데이트되었습니다', parsing.snippet);
      });

    });

    it('#watcha, 멤버십 갱신', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/watcha/watcha_renewal.json'), (err, data) => {
        if (err) throw err;

        const parsing = WatchaParser.checkStatus(data);

        assert.equal('Fwd: [WATCHA PLAY] 이용권이 성공적으로 갱신되었습니다.', parsing.snippet);
      });

    });
  });
});