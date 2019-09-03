require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretCode = `${process.env.JWT_SECRET}`;

const authMiddleware = (req, res, next) =>{
  const token = req.header('x-access-token') || req.query.token;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    });
  }

  jwt.verify(token, secretCode, (err, decode) =>{
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

module.exports = authMiddleware;
