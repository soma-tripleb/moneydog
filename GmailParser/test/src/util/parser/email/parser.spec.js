import assert from 'assert';

import AppleReceiptParser from '../../../../../src/util/parser/email/apple/appleReceiptParser';

import AppleReceipt from '../../../../../src/model/dto/apple';

import AppleMusicReceiptJSON from '../../../../resources/mock/email/apple/appleMusicReceipt.json';
import AppleWatchReceiptJSON from '../../../../resources/mock/email/apple/watchaReceipt.json';
import AppleYoutubeReceiptJSON from '../../../../resources/mock/email/apple/youtubeReceipt.json';

describe('Email Parser 테스트', () => {

  describe('Apple 영수증 Parser', () => {
    it('#apple, apple-music', async () => {
      try {
        const AppleMusicDTO = new AppleReceipt();
        const result = await AppleReceiptParser.metadataParse(AppleMusicReceiptJSON, AppleMusicDTO, AppleReceiptParser.iframeParse);

        assert.equal('Apple Music 구독 멤버십', result.name);

        return result;
      } catch (err) {
        throw err;
      }
    });

    it('#apple, watcha', async () => {
      try {
        const AppleWatchaDTO = new AppleReceipt();
        const result = await AppleReceiptParser.metadataParse(AppleWatchReceiptJSON, AppleWatchaDTO, AppleReceiptParser.iframeParse);

        assert.equal('왓챠플레이 - WATCHA PLAY, 이용권 (자동 갱신)', result.name);

        return result;
      } catch (err) {
        throw err;
      }
    });

    it('#apple, youtube', async () => {
      try {
        const AppleYoutubeDTO = new AppleReceipt();
        const result = await AppleReceiptParser.metadataParse(AppleYoutubeReceiptJSON, AppleYoutubeDTO, AppleReceiptParser.iframeParse);

        assert.equal('YouTube, YouTube Red (자동 갱신)', result.name);

        return result;
      } catch (err) {
        throw err;
      }
    });
  });
});