import axios from 'axios';
require('dotenv').config();

export function updateUserSubsInfo(inputSubsInfo) {
    return axios.post(`${process.env.REACT_APP_NODE_API_URL}/subscriptions`, { inputSubsInfo });
}