import 'babel-polyfill';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;
const TOKEN = Cookies.get('token');

const getUserSubs = () => {
  return axios({
    method: 'get',
    url: `${SERVER_URL}/subs-info`,
    headers: { 'x-access-token': TOKEN, 'Content-Type': 'application/json' },
    responseType: 'json',
  });
};

export default {
  getUserSubs,
};
