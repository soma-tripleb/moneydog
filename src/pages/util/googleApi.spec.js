import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const listMessages = async (userId, accessToken) => {
  return await axios(
    {
      method: 'get',
      url: `https://www.googleapis.com/gmail/v1/users/${userId}/messages?access_token=${accessToken}`,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    }
  );
};

const authLogin = async () => {
  console.log('AUTH LOGIN');

  return await axios(
    {
      method: 'get',
      url: `http://localhost:5000/auth/google`,
      responseType: 'json',
    }
  );
};

const authenticate = async () => {
  return await axios(
    {
      method: 'get',
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': ['Content-Type', 'application/xml'],
      },
      // params: {
      //   scope: 'https://www.googleapis.com/auth/gmail.readonly',
      //   access_type: 'offline',
      //   include_granted_scopes: 'true',
      //   state: 'state_parameter_passthrough_value',
      //   redirect_uri: 'http://localhost:8080/signup',
      //   response_type: 'code',
      //   client_id: '532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com'
      // },
      // responseType: 'json',
    }
  );
};

const login = async () => {
  return axios(
    {
      method: 'post',
      url: `${process.env.GOOGLE_API_OAUTH_URL}`,
      enctype: 'application/x-www-fomr-urlencoded',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      data: {
        client_id: `${process.env.GOOGLE_API_CLIENT_ID}`,
        client_secret: `${process.env.GOOGLE_API_CLIENT_SECRET}`,
        redirect_uri: `${process.env.GOOGLE_API_REDIRECT_URL}`,
        grant_type: 'authorization_code'
      }
    }
  );
};

export default {
  listMessages,
  login,
  authenticate,
  authLogin,
};
