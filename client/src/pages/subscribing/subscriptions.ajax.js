import axios from 'axios';
require('dotenv').config();

export function updateUserSubsInfo(inputSubsInfo) {
  return axios.post(`${process.env.REACT_APP_NODE_API_URL}/subscriptions`, {inputSubsInfo});
}

export function getSubTmtl() {
  return axios.get(`${process.env.REACT_APP_NODE_API_URL}/subs-tmpl`
  ).catch((err) => {
    return err.response;
  });
}
