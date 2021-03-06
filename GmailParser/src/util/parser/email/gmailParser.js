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
      let body = null;
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

      if (data.payload.body.size > 0) {
        body = data.payload.body.data;
      }

      if (typeof data.payload.parts !== 'undefined') {
        const length = data.payload.parts.length;

        for (let i = 0; i < length; i++) {
          const bodyData = data.payload.parts[i].body.data;

          switch (i) {
            case 0:
              body1 = bodyData;
              break;
            case 1:
              body2 = bodyData;
              break;
          }
        }
      }

      dto.setMessageId(messageId);
      dto.setCreateAt(createAt);
      dto.setFrom(from);
      dto.setTo(to);
      dto.setSubject(subject);
      dto.setSnippet(snippet);
      dto.setBody(body);
      dto.setBody1(body1);
      dto.setBody2(body2);

      return dto;
    },
  };
})();

export default GmailParser;
