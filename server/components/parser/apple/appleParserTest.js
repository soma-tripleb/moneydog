const {assert} = require('chai');
const fs = require('fs');
const appleParser = require('../apple/appleParser');

describe('AppleParser 테스트', () => {
  const response = fs.readFileSync('./appleMusicReceipt.json');
  const appleMusic = appleParser.getAppleInfo(response);
  describe('이메일 확인 테스트', () => {
    it('from email check ', () => {
      assert.strictEqual(appleParser.getFromEmail(response), 'no_reply@email.apple.com');
    });
  });
  describe('Apple Music 파싱 테스트', () => {
    console.log(appleMusic);
    it('Service 이름', () => {
      assert.strictEqual(appleMusic.name, 'Apple Music 구독 멤버십');
    });
    it('Calculate Period', () => {
      assert.strictEqual(appleMusic.periodMonth, 1);
    });
    it('Renewal date', () => {
      assert.strictEqual(appleMusic.renewal, '2019.08.28');
    });
  });
})
