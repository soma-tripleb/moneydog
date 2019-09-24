import {GET_SUBS, GET_USERS_SUBSTMPL_LIST} from '../actions/actionType';
import update from 'react-addons-update';

// subscription
const initialState =
{
  subsTmplList: [],
  subs: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBS:
      return {
        ...state,
        subs: action.subsInfo,
      };

    case GET_USERS_SUBSTMPL_LIST:
      console.log('subscription action method: ', action.list);
      return update(state, {
        subsTmplList: { $set: action.list },
      });

    default:
      return state;
  }
};
