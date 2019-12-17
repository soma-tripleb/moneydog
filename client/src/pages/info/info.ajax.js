import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = 'https://moneydogs.herokuapp.com/api';

const sendGoogleOAuthCode = async (code) => {

  const result = await axios({
    method: 'post',
    url: `${SERVER_URL}/google/oauth`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    data: { code: code },
    responseType: 'json',
  });

  return result;
};

const sendmailFormReport = (userSubscriptions) => {

  return axios({
    method: 'post',
    url: `${SERVER_URL}/alarm`,

    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    data: {
      userSubscriptions: userSubscriptions,
    },
    responseType: 'json',
  });
};

export default {
  sendGoogleOAuthCode, sendmailFormReport
};

