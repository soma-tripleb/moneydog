import axios from 'axios';
import Cookies from 'js-cookie';
require('dotenv').config();

const SERVER_URL = 'https://moneydogs.herokuapp.com/api';

const getList = async () => {
  return await axios({
    method: 'get',
    url: `${SERVER_URL}/subs-tmpl`,
    headers: {
      'x-access-token': Cookies.get('token'),
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  })
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      return err.response;
    });

};

export default {
  getList,
};
