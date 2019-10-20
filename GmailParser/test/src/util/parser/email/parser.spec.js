import assert from 'assert';

import fs from 'fs';
import path from 'path';
import AppleParser from '../../../../../src/util/parser/email/apple/appleParser';

describe.only('Email Parser 테스트', () => {

  describe('Email 로 날라온 영수증 샘플 파싱해보기', () => {
    it('#apple-music', () => {

      return fs.readFile(path.join(__dirname, '..', '..', '..', '..', '/resources/mock/email/apple/appleMusicReceipt.json'), (err, data) => {
        if (err) throw err;

        const parsing = AppleParser.getAppleInfo(data);

        console.log(parsing);
      });

    });

  });

});