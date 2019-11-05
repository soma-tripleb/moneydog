import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const insertUserSubsInfo = async (userInputList) => {
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

const updateUserSubsInfo = async (userSubsList) => {
  return await axios({
    method: 'put',
    url: `${SERVER_URL}/subs-info`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    data: userSubsList,
    responseType: 'json',
  });
};

export default {
  insertUserSubsInfo,
  updateUserSubsInfo,
};
