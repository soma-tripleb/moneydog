import SubsInfoRepository from './subsInfoRepository';

import {decodeJWT} from '../../security/jwtAuthenticationToken';

const getSubsInfo = async (token) => {
  const tokenParam = decodeJWT(token).param;
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

const addSubsInfo = async (subList, token) =>{
  const tokenParam = decodeJWT(token).param;

  const userInfo = await SubsInfoRepository.findByUserInfo(tokenParam);
  if (userInfo === null) {
    return {status: 400, success: false, message: '존재하지 않는 아이디 입니다.'};
  }

  let userSubsInfo = userInfo.subscription;
  userSubsInfo = userSubsInfo.concat(subList);
  return await SubsInfoRepository.updateSubscription(tokenParam, userSubsInfo);
};

const updateSubsInfo = async (subList, token) =>{
  const tokenParam = decodeJWT(token).param;

  const userInfo = await SubsInfoRepository.findByUserInfo(tokenParam);
  if (userInfo === null) {
    return {status: 400, success: false, message: '존재하지 않는 아이디 입니다.'};
  }
  if ( Object.keys(subList).length === 0) {
    const userSubsInfo = [];
    return await SubsInfoRepository.updateSubscription(tokenParam, userSubsInfo);
  } else {
    return await SubsInfoRepository.updateSubscription(tokenParam, subList);
  }
};

const deleteSubsInfo = async (subscription, token) =>{
  const tokenParam = decodeJWT(token).param;

  const userInfo = await SubsInfoRepository.findByUserInfo(tokenParam);
  if (userInfo === null) {
    return {status: 400, success: false, message: '존재하지 않는 아이디 입니다.'};
  }
  const userSubsInfo = userInfo.subscription;
  userSubsInfo.remove(subscription);
  return await SubsInfoRepository.updateSubscription(tokenParam, userSubsInfo);
};

export default {
  getSubsInfo,
  addSubsInfo,
  updateSubsInfo,
  deleteSubsInfo,
};
