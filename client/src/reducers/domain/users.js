import { GET_USERS, GET_USERS_SUBSTMPL_LIST } from '../actionType';
import update from 'react-addons-update';

// subscription
const initialState =
{
  subsTmplList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
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
