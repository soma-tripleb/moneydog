import * as ACTION_TYPE from '../actions/actionType';
import update from 'react-addons-update';

const initialState =
{
  login:
  {
    status: 'INIT',
  },
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.AUTH_LOGIN_TRY:
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
