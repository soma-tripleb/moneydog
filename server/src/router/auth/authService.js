import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

import AuthRepository from './authRepository';
import {checkedPasswordForm} from '../../../../public/userInfoCheck';
import {createJWT, checkJWT} from '../../security/jwtAuthenticationToken';

const register = async (userInfo) => {

  // pw check
  const pwCheckResult = checkedPasswordForm(userInfo.password);
  if (typeof pwCheckResult === 'string') {
    return {status: 400, success: false, message: pwCheckResult};
  }

  // user id check
  const user = await AuthRepository.getUserByEmail(userInfo.email);
  if (user !== null) {
    return {status: 400, success: false, message: '이미 존재하는 아이디 입니다.'};
  }


  userInfo.salt = (Math.round((new Date().valueOf() * Math.random())) + '');
  userInfo.password = crypto
    .createHash('sha512')
    .update(userInfo.password + userInfo.salt)
    .digest('hex');
  userInfo.role = 'BASIC';

  const result = await AuthRepository.createUser(userInfo);
  if (result.status === 400 ) {
    return result;
  } else {
    const jwt = createJWT(userInfo.email);
    return {status: 201, success: true, message: '회원가입에 성공했습니다.', token: jwt};
  }
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

const signUpCheckParam = (param) => {
  if (param === '' || !param.hasOwnProperty('email') || !param.hasOwnProperty('password') || !param.hasOwnProperty('nickname')) {
    return false;
  }
  return true;
};

const hasProperty = (res, param, key) =>{
  if (!param.hasOwnProperty(key)) {
    console.log(`key가 없을때. ${key}`);
    res.status(400).json({status: 400, success: false, message: `${key} key 가 없습니다.`});
  }
};

export default {
  register,
  login,
  sessionCheck,
  checkParameter: signUpCheckParam,
  hasProperty,
};
