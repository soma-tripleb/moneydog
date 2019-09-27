import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const getUserSubsInfo = async () => {
  return await axios({
    method: 'get',
    url: `${SERVER_URL}/`,
    headers: {
      'x-accsee-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  });
};

const updateUserSubsInfo = async (userInputList) => {
  return await axios({
    method: 'post',
    url: `${SERVER_URL}/users/subs-info`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    data: { userInputList },
    responseType: 'json',
  });
};

export default {
  getUserSubsInfo,
  updateUserSubsInfo,
};
