import express from 'express';
import {createJWT} from './security/jwtAuthenticationToken';

const router = express.Router();
const TEMPORALY_JWT_KEYWORD = 'yhpark';

router.get('/', (req, res) => {
  const token = createJWT(TEMPORALY_JWT_KEYWORD);

  res.status(200).json(
    {
      success: true,
      message: 'MoneyDog Server API',
      token: token,
    }
  );
});

export default router;
