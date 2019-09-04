import dotenv from 'dotenv';
import JWTWebToken from 'jsonwebtoken';
dotenv.config();

const secretCode = `${process.env.JWT_SECRET}`;
const EXPRIRE_TIME = '30m';

const createJWT = (param) => {
  const token = JWTWebToken.sign({param: param}, secretCode, {
    expiresIn: EXPRIRE_TIME,
  });

  return token;
};

export default createJWT;