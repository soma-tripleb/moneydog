import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const config = {
  headers:
      {
        'x-access-token': Cookies.get('auth'),
      },
};

const getList = () => {
  return axios.get( `${SERVER_URL}/subs-tmpl`,
    config
  ).catch((err) => {
    return err.response;
  });
};

export default {
  getList,
};
