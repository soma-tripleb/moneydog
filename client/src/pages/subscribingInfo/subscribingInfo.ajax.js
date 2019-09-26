import axios from 'axios';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const getUserSubsInfo = async (token) => {
  return await axios({
    method: 'get',
    url: `${SERVER_URL}/`,
    headers: { 'x-access-token': token },
    responseType: 'json',
  });
};

const updateUserSubsInfo = async (token, userInputList) => {
  return await axios({
    method: 'post',
    url: `${SERVER_URL}/users/subs-info`,
    headers: { 'x-access-token': token, 'Content-Type': 'application/json' },
    data: { userInputList },
    responseType: 'json',
  });
};

export default {
  getUserSubsInfo,
  updateUserSubsInfo,
};
