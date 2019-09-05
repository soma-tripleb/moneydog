import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const JSONWebToken = jwt;
const secretCode = `${process.env.JWT_SECRET}`;

const JWTAuthentication = (req, res, next) => {
  const token = (req.header('x-access-token') || req.query.token);

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    });
  }

  JSONWebToken.verify(token, secretCode, (err, decode) => {
    if (err) {
      console.log(err);
      return res.status(403).json({
        success: false,
        message: 'check token refresh',
      });
    } else {
      console.log('decode =', decode);
      next();
    }
  });
};

export default JWTAuthentication;
