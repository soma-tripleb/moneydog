import assert from 'assert';

import GooglePlayParser from '../../../../../../src/util/parser/email/googleplay/googleplayParser';
import GooglePlay from '../../../../../../src/model/dto/googleplay';

import GOOGLEPLAY_WATCHA_RECEIPT_JSON from '../../../../../resources/mock/email/googleplay/googleplayWatchaReceipt';

describe('GooglePlay Parser TEST', () => {
  describe('Parser 동작 확인하는 TEST', () => {
    it('#따로 준비해 놓은 JSON 데이터를 가지고, HTML TAG 파싱 결과가 맞는지 확인', async () => {
      const GooglePlayDTO = new GooglePlay();

      try {
        const result = await GooglePlayParser.metadataParse(GOOGLEPLAY_WATCHA_RECEIPT_JSON, GooglePlayDTO, GooglePlayParser.iframeParse);

        assert.equal('왓챠플레이', result.name);
        assert.equal(7900, result.price);
        assert.equal('2019. 8. 9', result.date);
        assert.equal('2019. 9. 9', result.renewal);
        assert.equal(1, result.periodMonth);

      } catch (err) {
        throw err;
      }

    });
  });
});