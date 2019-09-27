import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const TOKEN = Cookies.getJSON('token');

const getList = async () => {
  return await axios({
    method: 'get',
    url: `${SERVER_URL}/subs-tmpl`,
    headers: { 'x-access-token': TOKEN, 'Content-Type': 'application/json' },
    responseType: 'json',
  });
};

export default {
  getList,
};
