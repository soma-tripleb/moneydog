import CommonParser from './commonParser';

const GmailParser = (() => {
  return {
    metadataParse: (json, dto) => {

      const data = json.data;

      let messageId = null;
      let createAt = null;
      let from = null;
      let to = null;
      let subject = null;
      let snippet = null;
      let body1 = null;
      let body2 = null;

      data.payload.headers.some((headers) => {
        const name = headers.name.toLowerCase();

        switch (name) {
          case 'message-id':
            messageId = headers.value;
            break;
          case 'date':
            createAt = headers.value;
            break;
          case 'from':
            from = headers.value;
            break;
          case 'to':
            to = headers.value;
            break;
          case 'subject':
            subject = headers.value;
            break;
        }

        if ((messageId !== null) && (createAt !== null) && (from !== null) && (to !== null) && (subject !== null))
          return false;
      });

      snippet = data.snippet;

      const iframeBody1 = data.payload.parts[0].body.data;
      const iframeBody2 = data.payload.parts[1].body.data;

      const bodyDecoded1 = CommonParser.base64ToUtf8(iframeBody1);
      const bodyDecoded2 = CommonParser.base64ToUtf8(iframeBody2);

      body1 = bodyDecoded1.replace(/\r\n/gi, '');
      body2 = bodyDecoded2.replace(/\r\n/gi, '');

      dto.setMessageId(messageId);
      dto.setCreateAt(createAt);
      dto.setFrom(from);
      dto.setTo(to);
      dto.setSubject(subject);
      dto.setSnippet(snippet);
      dto.setBody1(body1);
      dto.setBody2(body2);

      return dto;
    }
  };
})();

export default GmailParser;
