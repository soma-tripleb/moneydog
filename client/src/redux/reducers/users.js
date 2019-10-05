import * as ACTION_TYPE from '../actions/actionType';

import update from 'react-addons-update';

const initialState =
    {
      tempSubscriptions: [],
      subscriptions: [],
    };

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_SUBS:
      return {
        ...state,
        subscriptions: action.subsInfo,
      };

    case ACTION_TYPE.GET_USERS_SUBSTMPL_LIST:
      return update(state, {
        tempSubscriptions: {$set: action.list},
      });

    case ACTION_TYPE.USER_INITIALLIZE:
      return {
        ...state,
        subscriptions: [],
        tempSubscriptions: [],
      };

    case ACTION_TYPE.INSERT_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: update(state.subscriptions, {$push: action.userSubscriptionList}),
      };

    case ACTION_TYPE.DELETE_TEMP_SUBSCRIPTIONS:
      return {
        ...state,
        tempSubscriptions: [],
      };

    default:
      return state;
  }
};
