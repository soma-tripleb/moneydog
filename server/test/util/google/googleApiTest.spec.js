import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

describe('Google API', () => {

  describe('OAuth', () => {
    it('site info check', (done) => {
      assert.equal(process.env.GOOGLE_API_REDIRECT_URL, 'http://localhost:5000/google/signup');
      assert.equal(process.env.GOOGLE_API_CLIENT_ID, '532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com');
      assert.equal(process.env.GOOGLE_API_CLIENT_SECRET, 'QNzzHMDXr4MXhpxUuefGZnXO');
      done();
    });
  });
});

