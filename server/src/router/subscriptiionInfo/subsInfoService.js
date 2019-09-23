import SubsInfoRepository from './subsInfoRepository';

import {decodeJWT} from '../../security/jwtAuthenticationToken';

const getSubsInfo = async (token) => {
  const tokenParam = decodeJWT(token).param;

  console.log(tokenParam);

  const userInfo = await SubsInfoRepository.findByUserInfo(tokenParam);

  if (userInfo === null) {
    return {status: 400, success: false, message: '존재하지 않는 아이디 입니다.'};
  }

  const userSubsInfo = userInfo.subscription;

  if (userSubsInfo.length === 0 ) {
    return {status: 200, success: true, message: '회원의 구독 정보가 존재하지 않습니다.'};
  }

  return {status: 200, success: true, message: userSubsInfo};
};

// const getUser = (email) => {
//   return UserRepository.findOne(email);
// };
//
// const createOne = (user) => {
//   return UserRepository.saveOne(user);
// };
//
// const deleteOne = (name) => {
//   return UserRepository.deleteOne(name);
// };

export default {
  getSubsInfo,
};
