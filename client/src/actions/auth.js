import axios from 'axios';

import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from './ActionTypes';


export const loginRequest = (email, password) => async (dispatch) => {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/users/signIn`;
  const AJAX_DATA = {
    userInfo: {
      email: email,
      password: password,
    },
  };

  dispatch(login());

  await axios
    .post(AJAX_URL, AJAX_DATA)
    .then((res) => {
      console.log('success');
      dispatch(loginSuccess(email));
    })
    .catch((err) => {
      console.log(err + 'failed');
      dispatch(loginFailure());
    });
};

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}
