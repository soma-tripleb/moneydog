import axios from 'axios';

import {GET_USERS} from "./types";

// export const getUsers = () => dispatch => {
//   axios
//       .get('/api/leads/')
//       .then(res => {
//         dispatch({
//           type: GET_USERS,
//           payload: res.data
//         });
//       })
//       .catch(err => console.log(err));
// };

export const login = (userInfo) => async dispatch => {
  await axios
      .post(`${process.env.REACT_APP_NODE_API_URL}/users/signIn`,
          {
            userInfo: {
              email: userInfo.email,
              password: userInfo.password,
            }
          })
      .then(res => {
        dispatch({
          type: GET_USERS,
          payload: res.data
        })
      })
      .catch(err => {
        return err.response;
      });
};
