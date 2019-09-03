require('dotenv').config();
const crypto = require('crypto');

const UserRepository = require('./userRepository');

const jwt = require('jsonwebtoken');
const secretCode = `${process.env.JWT_SECRET}`;

const register = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);

  if (user === null) {
    userInfo.content = Math.round((new Date().valueOf() * Math.random())) + '';
    userInfo.password = crypto.createHash('sha512').update(userInfo.password + userInfo.content).digest('hex');

    UserRepository.createUser(userInfo);
    return true;
  } else {
    return false;
  }
};

const login = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);

  const salt = user.content;
  const hashPassword = crypto.createHash('sha512').update(userInfo.password + salt).digest('hex');

  if (user === null) {
    return 400;
  } else if (user.password === hashPassword) {
    return 200;
  } else if (user.password !== hashPassword) {
    return 409;
  }
};

const createJWT = (email) => {
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, secretCode, {
    expiresIn: '30m',
  });
  return token;
};

const getUserByEmail = async (email) => {
  const user = await UserRepository.getUserByEmail(email);
  return user;
};

module.exports = {
  register: register,
  login: login,
  createJWT: createJWT,
  getUserByEmail: getUserByEmail,
};
