import assert from 'assert';

import GOOGLEPLAY_WATCHA_RECEIPT from '../../../../../resources/mock/email/googleplay/googleplayWatchaReceipt.json';

import CommonParser from '../../../../../../src/util/parser/email/commonParser';

describe.only('GooglePlay 메일 파싱하기', () => {
  describe('GooglePlay 영수증 Parser', () => {
    it('#googleplay, watcha', (done) => {

      const bodyText = GOOGLEPLAY_WATCHA_RECEIPT.payload.parts[0].body.data;
      const bodyIframe = GOOGLEPLAY_WATCHA_RECEIPT.payload.parts[1].body.data;

      const bodyTextDecode = CommonParser.base64ToUtf8(bodyText);
      const bodyIframeDecode = CommonParser.base64ToUtf8(bodyIframe);

      console.log(bodyTextDecode);
      console.log(bodyIframeDecode);

      done();
    });
  });
});