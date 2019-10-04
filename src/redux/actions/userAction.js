import axios from 'axios';

import * as ACTION_TYPE from './actionType';
import Cookies from 'js-cookie';

const SERVER_URL = `${process.env.REACT_APP_NODE_API_URL}`;

const setUserSubsTmplList = (list) => (dispatch) => {
  dispatch(
    {
      type: ACTION_TYPE.GET_USERS_SUBSTMPL_LIST,
      list,
    }
  );
};

const insertUserSubscriptions = ( userSubscriptionList ) => (dispatch) => {
  dispatch(
    {
      type: ACTION_TYPE.INSERT_SUBSCRIPTIONS,
      userSubscriptionList,
    }
  );
};

const deleteTempSubscriptions = () => (dispatch) => {
  dispatch(
    {
      type: ACTION_TYPE.DELETE_TEMP_SUBSCRIPTIONS,
    }
  );
};

const getSubsInfo = () => async (dispatch) => {
  const AJAX_URL =`${SERVER_URL}/subs-info`;
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
          type: ACTION_TYPE.GET_SUBS,
          subsInfo: [],
        });
      } else {
        dispatch({
          type: ACTION_TYPE.GET_SUBS,
          subsInfo: res.data.message,
        });
      }
    })
    .catch((err) => {
      return err.response;
    });
};

export default {
  setUserSubsTmplList,
  getSubsInfo,
  insertUserSubscriptions,
  deleteTempSubscriptions
};
