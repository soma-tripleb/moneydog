import * as ACTION_TYPE from '../actions/actionType';
import update from 'react-addons-update';

const initialState =
{
  login:
  {
    status: 'INIT',
  },
  status:
  {
    isLoggedIn: false,
    currentUser: '',
  },
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.AUTH_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case ACTION_TYPE.AUTH_LOGOUT:
      return update(state, {
        login: {
          status: { $set: 'INIT' },
        },
      });
    case ACTION_TYPE.AUTH_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
        status: {
          isLoggedIn: { $set: true },
          JWT: { $set: action.token },
        },
      });
    case ACTION_TYPE.AUTH_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
}
