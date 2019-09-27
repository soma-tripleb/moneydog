import Cookies from 'js-cookie';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const getUserSubs = () => {
  return axios({
    method: 'get',
    url: `${SERVER_URL}/subs-info`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  });
};

export default {
  getUserSubs,
};
