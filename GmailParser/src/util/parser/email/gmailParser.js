import CommonParser from './commonParser';

const GmailParser = (() => {
  return {
    metadataParse: (json, dto) => {

      const data = json.data;

      let id = null;
      let snippet = null;
      let date = null;
      let from = null;
      let subject = null;
      let body1 = null;
      let body2 = null;

      id = data.id;
      snippet = data.snippet;

      data.payload.headers.some((headers) => {
        const name = headers.name.toLowerCase();

        switch (name) {
          case 'date':
            date = headers.value;
            break;
          case 'from':
            from = headers.value;
            break;
          case 'subject':
            subject = headers.value;
            break;
        }

        if ((date !== null) && (from !== null) && (subject !== null))
          return false;
      });

      const iframeBody1 = data.payload.parts[0].body.data;
      const iframeBody2 = data.payload.parts[1].body.data;

      const bodyDecoded1 = CommonParser.base64ToUtf8(iframeBody1);
      const bodyDecoded2 = CommonParser.base64ToUtf8(iframeBody2);

      body1 = bodyDecoded1.replace(/\r\n/gi, '');
      body2 = bodyDecoded2.replace(/\r\n/gi, '');

      dto.setId(id);
      dto.setSnippet(snippet);
      dto.setDate(date);
      dto.setFrom(from);
      dto.setSubject(subject);
      dto.setBody1(body1);
      dto.setBody2(body2);

      return dto;
    }
  };
})();

export default GmailParser;
