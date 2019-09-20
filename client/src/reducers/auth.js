import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';
import {test} from '../actions/auth';

const initialsState = {
  login: {
    status: 'INIT',
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  },
};

export default function authentication(state = initialsState, action) {
  switch (action.type) {
  case types.AUTH_LOGIN:
    return update(state, {
      login: {
        status: {$set: 'WAITING'},
      },
    });
  case types.AUTH_LOGOUT:
    return update(state, {
      login: {
        status: {$set: 'INIT'},
      },
    });
  case types.AUTH_LOGIN_SUCCESS:
    return update(state, {
      login: {
        status: {$set: 'SUCCESS'},
      },
      status: {
        isLoggedIn: {$set: true},
        JWT: {$set: action.token},
        currentUser: {$set: action.email},
      },
    });
  case types.AUTH_LOGIN_FAILURE:
    return update(state, {
      login: {
        status: {$set: 'FAILURE'},
      },
    });
  default:
    return state;
  }
}
