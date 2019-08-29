import axios from 'axios';
require('dotenv').config();

export function getUserServiceInfo(userID) {
  return axios.get(`${process.env.REACT_APP_NODE_API_URL}/subscribeInfo/${userID}`);
}

export function getUserByEmail(email) {
  return axios.get(`${process.env.REACT_APP_NODE_API_URL}/users/${email}`);
}
