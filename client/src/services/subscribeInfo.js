import axios from 'axios';

export function getUserServiceInfo(userID) {
  return axios.get(`http://localhost:5000/subscribeInfo/${userID}`);
}
