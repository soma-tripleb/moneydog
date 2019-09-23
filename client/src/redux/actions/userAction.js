import axios from 'axios';

import {GET_SUBS, GET_USERS_SUBSTMPL_LIST } from './actionType';
import Cookies from 'js-cookie';

const getUserSubsTmplList = (list) => (dispatch) => {
  dispatch(
    {
      type: GET_USERS_SUBSTMPL_LIST,
      list,
    }
  );
};

export const getSubsInfo = () => async (dispatch) => {
  const auth = Cookies.get('auth');

  console.log('auth ', auth);
  const config = {
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbSI6ImFkbWluQGZraWkub3JnIiwiaWF0IjoxNTY5MjQwMDE1LCJleHAiOjE1NjkyNTgwMTV9.74ZgHQ5tCFuQ8XHOZvBsBf_dWEaDM7ct3p6yN9OOYZc',
    },
  };
  await axios
    .get(`${process.env.REACT_APP_NODE_API_URL}/subs-info`,
      config
    )
    .then((res) => {
      dispatch({
        type: GET_SUBS,
        subsInfo: res.data.message,
      });
    })
    .catch((err) => {
      return err.response;
    });
};

export default {
  getUserSubsTmplList,
  getSubsInfo
};
