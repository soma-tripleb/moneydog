import axios from 'axios';
require('dotenv').config();

export function getUserSubsInfo() {
    return axios.get(`${process.env.REACT_APP_NODE_API_URL}/subscriptions`);
}