import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const getList = async () => {
  return await axios({
    method: 'get',
    url: `${SERVER_URL}/subs-tmpl`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  });
};

export default {
  getList,
};
