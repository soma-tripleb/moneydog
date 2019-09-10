import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const secretCode = `${process.env.JWT_SECRET}`;
const EXPRIRE_TIME = '30m';

const createJWT = (param) => {
  return jwt.sign(
    {
      param: param,
    },
    secretCode,
    {
      expiresIn: EXPRIRE_TIME,
    }
  );
};

export {
  createJWT,
};
