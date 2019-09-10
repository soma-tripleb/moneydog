import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

import AuthRepository from './authRepository';

const register = async (userInfo) => {
  userInfo.salt = (Math.round((new Date().valueOf() * Math.random())) + '');
  userInfo.password = crypto
    .createHash('sha512')
    .update(userInfo.password + userInfo.salt)
    .digest('hex');
  userInfo.role = 'BASIC';

  return await AuthRepository.createUser(userInfo);
};

const login = async (userInfo) => {
  const user = await AuthRepository.getUserByEmail(userInfo.email);

  if (user === null) {
    return 400;
  }

  const salt = user.salt;
  const hashPassword = crypto
    .createHash('sha512')
    .update(userInfo.password + salt)
    .digest('hex');

  if (user.password === hashPassword) {
    return 200;
  } else if (user.password !== hashPassword) {
    return 409;
  }
};

export default {
  register,
  login,
};
