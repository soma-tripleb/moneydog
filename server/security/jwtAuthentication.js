import dotenv from 'dotenv';
import JsonWebToken from 'jsonwebtoken';
dotenv.config();

const secretCode = `${process.env.JWT_SECRET}`;

export default function JWTAuthentication (req, res, next) {
  const token = req.header('x-access-token') || req.query.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    });
  }

  JsonWebToken.verify(token, secretCode, (err, decode) => {
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
