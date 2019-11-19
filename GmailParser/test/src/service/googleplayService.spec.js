import should from 'should';

import UserQuery from 'src/db/userQuery';

describe.only('GooglePlayService 는', () => {
  describe('파싱한 결과를 DB에 저장할 때', () => {

    // 'dev' db
    const useremail = 'moneydogtest1@gmail.com';

    it('같은 서비스가 존재하는지 확인한다.', async () => {

      try {
        const userInfo = await UserQuery.getUser(useremail);

        console.log(userInfo);
      } catch (err) {
        throw err;
      }
    });
  });
});