import express from 'express';

import { createJWT } from './src/security/jwtAuthenticationToken';

const router = express();
const TEMPORALY_JWT_KEYWORD = 'yhpark';

router.get('/', (req, res) => {
  const { headers, method, url } = req;

  const token = createJWT(TEMPORALY_JWT_KEYWORD);

  res.on('error', (err) => {
    console.error(err);
  });

  const body = {
    success: true,
    message: 'MoneyDog Server API',
    token: token,
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const responseBody = { headers, method, url, body };

  res.write(JSON.stringify(responseBody));
  res.end();
});

export default router;
