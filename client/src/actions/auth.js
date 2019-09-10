import axios from 'axios';

import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
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
      dispatch(loginSuccess(res.data.token));
      return res;
    })
    .catch((err) => {
      dispatch(loginFailure());
      return err.response;
    });
};

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSuccess(token) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    token,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}
