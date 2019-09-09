import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const JSONWebToken = jwt;
const secretCode = `${process.env.JWT_SECRET}`;
const EXPRIRE_TIME = '30m';

const createJWT = (param) => {
  const payload = {
    param: param,
  };

  const token = JSONWebToken.sign(payload, secretCode, {
    expiresIn: EXPRIRE_TIME,
  });

  return token;
};

export {
  createJWT,
};
