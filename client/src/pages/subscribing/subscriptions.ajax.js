import axios from 'axios';
require('dotenv').config();

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const getList = (token) => {
  return axios.get(SERVER_URL + `/subs-tmpl`,
    {
      headers:
      {
        'x-access-token': token,
      },
    }
  ).catch((err) => {
    return err.response;
  });
};

export default {
  getList,
};
