import axios from 'axios';
import Cookies from 'js-cookie';
import { configs } from '../../configs';
import {AUTH_LOGIN_TRY, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, USER_INITIALLIZE} from './actionType';

const configTest = (() => {
  console.log('${process.env.REACT_APP_NODE_API_URL} ' + `${process.env.REACT_APP_NODE_API_URL}/auth/signUp`);
  console.log('${configs.API_URL} ' + `${configs.API_URL}/auth/signUp`);
  console.log('process.env.REACT_APP_NODE_API_URL ' + process.env.REACT_APP_NODE_API_URL);
  console.log('configs.API_URL ' + configs.API_URL);

  return process.env.REACT_APP_NODE_API_URL;
})();

const loginRequest = (email, password) => async (dispatch) => {
  const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/auth/signIn`;
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
      dispatch(LOGIN_SUCCESS(res.data.nickname));
      return res;
    })
    .catch((err) => {
      dispatch(LOGOUT());
      return err.response;
    });
};

const registerRequest = (email, password, nickname) => async (dispatch) => {
  // const AJAX_URL = `${process.env.REACT_APP_NODE_API_URL}/auth/signUp`;
  console.log('config test func ' + configTest);
  console.log('configs.API_URL ' + configs.API_URL);

  const AJAX_URL = `${configs.API_URL}/auth/signUp`;
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
      dispatch(LOGIN_SUCCESS(nickname));
      return res;
    })
    .catch((err) => {
      dispatch(LOGOUT());
      return err.response;
    });
};

const logoutRequest = () => (dispatch) => {
  dispatch(LOGOUT());
  dispatch({
    type: USER_INITIALLIZE,
  });

  Cookies.remove('token');
};

const LOGIN_TRY = () => {
  return {type: AUTH_LOGIN_TRY};
};

const LOGOUT = () => {
  return {type: AUTH_LOGOUT};
};

const LOGIN_SUCCESS = (nickname) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    nickname: nickname
  };
};

export default {
  loginRequest,
  logoutRequest,
  registerRequest,
};
