import Cookies from 'js-cookie';

require('dotenv').config();

import axios from 'axios';

export function getUserServiceInfo(userID) {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/subscribeInfo/${userID}`;
  const headerConfig = {
    headers: {
      'x-access-token': Cookies.get('token'),
    },
  };
  return axios
    .get(AJAX_URL, headerConfig);
}

export function getUserByEmail(email) {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/users/${email}`;
  const headerConfig = {
    headers: {
      'x-access-token': Cookies.get('token'),
    },
  };
  return axios
    .get(AJAX_URL, headerConfig);
}

export function getSubscriptionByToken() {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/users/auth/check`;
  const headerConfig = {
    headers: {
      'x-access-token': Cookies.get('token'),
    },
  };
  return axios
    .get(AJAX_URL, headerConfig);
}
