import express from 'express';

import { createJWT } from './src/security/jwtAuthenticationToken';

const router = express();

router.get('/', (req, res) => {
  const { headers, method, url } = req;

  const token = createJWT(req.body.param);

  res.on('error', (err) => {
    console.error(err);
  });

  const data = {
    success: true,
    message: 'MoneyDog Server API',
    token: token,
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const responseBody = { headers, method, url, data };

  res.write(JSON.stringify(responseBody));
  res.end();
});

export default router;
