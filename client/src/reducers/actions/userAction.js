import axios from 'axios';

import { GET_USERS, GET_USERS_SUBSTMPL_LIST } from '../actionType';

const login = (userInfo) => async (dispatch) => {
  await axios
    .post(`${process.env.REACT_APP_NODE_API_URL}/users/signIn`,
      {
        userInfo: {
          email: userInfo.email,
          password: userInfo.password,
        },
      })
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return err.response;
    });
};

const getUserSubsTmplList = (list) => (dispatch) => {
  dispatch(
    {
      type: GET_USERS_SUBSTMPL_LIST,
      list,
    }
  );
};

export default {
  login,
  getUserSubsTmplList,
};
