import assert from 'assert';

import Common from '../../../src/model/dto/mail/common';

describe('Parsing Info 객체 테스트', () => {

  it('#객체 확장 불가능하게 `preventExtensions` 속성 추가', (done) => {
    const Netflix = new Common();
    const Youtube = new Common();

    Netflix.setName('Netflix');
    Youtube.setName('Youtube');

    try {
      Netflix.title = 'title';
    } catch (TypeError) {
      assert.ok(true);
    }

    try {
      assert.equal('Netflix', Netflix.name);
      assert.equal('Youtube', Youtube.name);
      done();
    } catch (err) {
      throw done(err);
    }
  });

});