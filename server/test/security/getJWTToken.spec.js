import assert from 'assert';
import {createJWT} from '../../src/security/jwtAuthenticationToken';

describe('Json Web Token', () => {
  describe('#create', () => {
    it('jwt token 생성하기', (done) => {
      assert(createJWT('dudrnxps1@gmail.com'));
      done();
    });
  });
});