import axios from 'axios';
import Cookies from 'js-cookie';

import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT } from '../actionType';

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const loginRequest = (email, password) => async (dispatch) => {
  const AJAX_URL = `${SERVER_URL}/auth/signIn`;
  const AJAX_DATA = {
    userInfo: {
      email: email,
      password: password,
    },
  };

  dispatch(LOGIN());

  return await axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      dispatch(LOGIN_SUCCESS(res.data.token));
      return res;
    })
    .catch((err) => {
      dispatch(LOGIN_FAILURE());
      return err.response;
    });
};

const sessionRequest = (jwt) => async (dispatch) => {
  const AJAX_URL = `${SERVER_URL}/auth/sessionCheck`;
  const AJAX_DATA = {
    userInfo: {
      jwt: jwt,
    },
  };

  return await axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      dispatch(LOGIN_SUCCESS(res.data.token));
      return res;
    })
    .catch((err) => {
      dispatch(LOGIN_FAILURE());
      return err.response;
    });
};

const logoutRequest = () =>(dispatch) => {
  dispatch(LOGOUT());

  localStorage.removeItem('auth');
  Cookies.remove('auth');
};

const LOGIN = () => { return { type: AUTH_LOGIN }; };

const LOGOUT = () => { return { type: AUTH_LOGOUT }; };

const LOGIN_SUCCESS = (token) => {return { type: AUTH_LOGIN_SUCCESS, token }; };

const LOGIN_FAILURE = () => { return { type: AUTH_LOGIN_FAILURE }; };

export default {
  loginRequest,
  sessionRequest,
  logoutRequest,
};
