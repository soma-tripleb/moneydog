import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

import AuthRepository from './authRepository';
import {createJWT, checkJWT} from '../../security/jwtAuthenticationToken';

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
    return {status: 400, success: false, message: '없는 아이디 입니다.'};
  }

  const salt = user.salt;
  const hashPassword = crypto
    .createHash('sha512')
    .update(userInfo.password + salt)
    .digest('hex');

  if (user.password === hashPassword) {
    const jwt = createJWT(user.email);
    return {status: 200, success: true, message: '로그인에 성공 했습니다.', token: jwt};
  } else if (user.password !== hashPassword) {
    return {status: 409, success: false, message: '비밀번호가 틀렸습니다.'};
  }
};

const sessionCheck = async (userInfo) =>{
  return checkJWT(userInfo.jwt);
};

export default {
  register,
  login,
  sessionCheck,
};
