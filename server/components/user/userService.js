import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

import UserRepository from './userRepository';

const register = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);

  if (user === null) {
    userInfo.content = (Math.round((new Date().valueOf() * Math.random())) + '');
    userInfo.password = crypto
      .createHash('sha512')
      .update(userInfo.password + userInfo.content)
      .digest('hex');

    UserRepository.createUser(userInfo);
    return true;
  } else {
    return false;
  }
};

const login = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);

  const salt = user.content;
  const hashPassword = crypto
    .createHash('sha512')
    .update(userInfo.password + salt)
    .digest('hex');

  if (user === null) {
    return 400;
  } else if (user.password === hashPassword) {
    return 200;
  } else if (user.password !== hashPassword) {
    return 409;
  }
};

const getUserByEmail = async (email) => {
  const user = await UserRepository.getUserByEmail(email);
  return user;
};

export {
  register,
  login,
  getUserByEmail,
};