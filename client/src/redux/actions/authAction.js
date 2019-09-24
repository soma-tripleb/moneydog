import axios from 'axios';
import Cookies from 'js-cookie';

import {AUTH_LOGIN_TRY, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT, GET_SUBS} from './actionType';

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const loginRequest = (email, password) => async (dispatch) => {
  const AJAX_URL = `${SERVER_URL}/auth/signIn`;
  const AJAX_DATA = {
    userInfo: {
      email: email,
      password: password,
    },
  };

  dispatch(LOGIN_TRY());

  return await axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      dispatch(LOGIN_SUCCESS());
      return res;
    })
    .catch((err) => {
      dispatch(LOGIN_FAILURE());
      return err.response;
    });
};

const registerRequest = (email, password, nickname) => async (dispatch) => {
  const AJAX_URL = `${SERVER_URL}/auth/signUp`;
  const AJAX_DATA = {
    userInfo: {
      email: email,
      password: password,
      nickname: nickname,
    },
  };

  dispatch(LOGIN_TRY());

  return axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      dispatch(LOGIN_SUCCESS());
      return res;
    })
    .catch((err) => {
      dispatch(LOGIN_FAILURE());
      return err.response;
    });
};


const logoutRequest = () =>(dispatch) => {
  dispatch(LOGOUT());
  dispatch({
    type: GET_SUBS,
    subsInfo: [],
  });

  Cookies.remove('token');
};

const LOGIN_TRY = () => { return { type: AUTH_LOGIN_TRY }; };

const LOGOUT = () => { return { type: AUTH_LOGOUT }; };

const LOGIN_SUCCESS = () => {return { type: AUTH_LOGIN_SUCCESS }; };

const LOGIN_FAILURE = () => { return { type: AUTH_LOGIN_FAILURE }; };

export default {
  loginRequest,
  logoutRequest,
  registerRequest,
};
