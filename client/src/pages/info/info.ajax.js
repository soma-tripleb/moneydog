import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const sendGoogleOAuthCode = async (code) => {

  return await axios({
    method: 'post',
    url: `${SERVER_URL}/google/oauth`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    data: code,
    responseType: 'json',
  });
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

