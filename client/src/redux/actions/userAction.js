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
  const AJAX_URL =`${process.env.REACT_APP_NODE_API_URL}/subs-info`;
  const headerConfig = {
    headers: {
      'x-access-token': Cookies.get('token'),
    },
  };

  await axios
    .get(AJAX_URL, headerConfig)
    .then((res) => {
      if (typeof res.data.message === 'string') {
        dispatch({
          type: GET_SUBS,
          subsInfo: [],
        });
      } else {
        dispatch({
          type: GET_SUBS,
          subsInfo: res.data.message,
        });
      }
    })
    .catch((err) => {
      return err.response;
    });
};

export default {
  getUserSubsTmplList,
  getSubsInfo
};
