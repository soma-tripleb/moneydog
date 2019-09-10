require('dotenv').config();

import axios from 'axios';
import cookie from 'react-cookies';

export function getUserServiceInfo(userID) {
  return axios.get(`${process.env.REACT_APP_NODE_API_URL}/subscribeInfo/${userID}`, {
    headers: { // 요청 헤더
      'x-access-token': cookie.load('token'),
    },
  });
}

export function getUserByEmail(email) {
  return axios.get(`${process.env.REACT_APP_NODE_API_URL}/users/${email}`);
}
