import GOOGLEPLAY_WATCHA_RECEIPT from '../../../../../test/resources/mock/email/googleplay/googleplayWatchaReceipt.json';

import CommonParser from '../commonParser';

const bodyParser = () => {
  const bodyText = GOOGLEPLAY_WATCHA_RECEIPT.payload.parts[0].body.data;
  const bodyIframe = GOOGLEPLAY_WATCHA_RECEIPT.payload.parts[1].body.data;

  const bodyTextDecode = CommonParser.replaceAll(CommonParser.base64ToUtf8(bodyText), '\r\n', ' ');
  const bodyIframeDecode = CommonParser.replaceAll(CommonParser.base64ToUtf8(bodyIframe), '\r\n', ' ');

  return {bodyTextDecode, bodyIframeDecode};
};

export default {
  bodyParser,
};
