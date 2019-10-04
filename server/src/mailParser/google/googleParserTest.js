const {assert} = require('chai');
const fs = require('fs');
const googleParser = require('./googleParser');

describe('GoogleParser 테스트', () => {
  const response = fs.readFileSync('./gmail_response.json');
  const watcha = googleParser.getGoolgeInfo(response);
  describe('FromMail 테스트', () => {
    it('check from email ', () => {
      assert.strictEqual(googleParser.getFromEmail(response), 'googleplay-noreply@google.com');
    });
  });
  describe('Watcha 테스트', () => {
    it('check service name', () => {
      assert.strictEqual(watcha.name, '왓챠플레이');
    });
    it('check service renewal', () => {
      assert.strictEqual(watcha.renewal, '2019. 9. 9');
    });
    it('check service date', () => {
      assert.strictEqual(watcha.date, '2019. 8. 9');
    });
    it('check service price', () => {
      assert.isNumber(watcha.price);
      assert.strictEqual(watcha.price, 7900);
    });
  });
});
