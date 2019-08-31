require('dotenv').config();

const UserRepository = require('./userRepository');

const jwt = require('jsonwebtoken');
const secretCode = `${process.env.JWT_SECRET}`;

const register = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);
  if (user === null) {
    UserRepository.createUser(userInfo);
    return true;
  } else {
    return false;
  }
};

const login = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);
  if (user === null) {
    return 400;
  } else if (user.password === userInfo.password) {
    return 200;
  } else if (user.password !== userInfo.password) {
    return 409;
  }
};

const createJWT = (email) => {
  const payload = {
    email: email,
  }
  const token = jwt.sign(payload, secretCode, {
    expiresIn: '30m',
  });
  return token;
};

const getUserByEmail = (email) => {
  // return UserRepository.getUserByEmail(email);
  UserRepository.getUserByEmail(email);
};

module.exports = {
  register: register,
  login: login,
  createJWT: createJWT,
  getUserByEmail: getUserByEmail,
};
