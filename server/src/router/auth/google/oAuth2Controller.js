import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import GoogleOAuthApi from '../../../util/google/googleOAuthApi';

const router = express.Router();
const GoogleOAuth = new GoogleOAuthApi();

router.get('/oauth', (req, res) => {
  GoogleOAuth.url()
    .then((result) => {
      res.redirect(result);
    })
    .catch((err) => {
      throw err;
    });
});

// 'Google api console' 에 등록된 'redirect_url' 이기 때문에, uri 바뀌면 안됨.
router.get('/signup', async (req, res) => {
  const code = req.query.code;

  /*
    구글 회원가입이 아닌 'Gmail' 권한만 획득하는 과정.

    회원 가입 -> 구글 권한 획득 -> 회원 가입
  */
  GoogleOAuth.getTokensAsync(code)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

export default router;
