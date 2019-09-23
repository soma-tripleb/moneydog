import axios from 'axios';
import Cookies from 'js-cookie';

import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
} from './ActionTypes';


export const loginRequest = (email, password) => async (dispatch) => {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/auth/signIn`;
  const AJAX_DATA = {
    userInfo: {
      email: email,
      password: password,
    },
  };

  dispatch(login());

  return await axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      dispatch(loginSuccess(res.data.token, email));
      return res;
    })
    .catch((err) => {
      dispatch(loginFailure());
      return err.response;
    });
};

export const sessionRequest = (jwt) => async (dispatch) => {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/auth/sessionCheck`;
  const AJAX_DATA = {
    userInfo: {
      jwt: jwt,
    },
  };

  return await axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      dispatch(loginSuccess(res.data.token));
      return res;
    })
    .catch((err) => {
      dispatch(loginFailure());
      return err.response;
    });
};

export const logoutRequest = () =>(dispatch) => {
  dispatch(logout());
  localStorage.removeItem('auth');
  Cookies.remove('auth');
};

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function loginSuccess(token, email) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    token,
    email,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}
