import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const secretCode = `${process.env.JWT_SECRET}`;
const EXPRIRE_TIME = '30m';

// param is user email
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

const checkJWT = (token) =>{
  return jwt.verify(token, secretCode, (err, decode) => {
    if (err) {
      console.log(err);
      return {status: 401, success: false, message: err.message};
    } else {
      return {status: 200, success: true, message: 'session Check Success', token: createJWT(decode.param)};
    }
  });
};

export {
  createJWT, checkJWT,
};
