import axios from 'axios';
require('dotenv').config();

// 'subscribing' 에서 선택한 구독 서비스 목록 가져오기
const getUserSubsInfo = () => {
  return axios.get(`${process.env.REACT_APP_NODE_API_URL}/subs-tmpl`);
};

/*
사용자로 부터 입력 받은 구독 서비스 정보(결제일 / 결제 금액) 보내주기

TODO, 사용자별로 정보 보내주기 (ex, localhost:5000/subscriptions/1)
//  */
// export function updateUserSubsInfo(inputSubsInfo) {
//   return axios.post(`${process.env.REACT_APP_NODE_API_URL}/subs-`, {inputSubsInfo});
// }

export default {
  getUserSubsInfo,
};
