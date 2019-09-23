import { combineReducers } from 'redux';

import auth from './domain/auth';
import users from './domain/users';

export default combineReducers(
  {
    auth, users,
  }
);
