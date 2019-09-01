import { GET_USERS} from '../actions/types';

const initialsState = {
  users: []
};

export default function(state = initialsState, action ){
  switch (action.type) {
    case GET_USERS:
      console.log(action.payload);
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;

  }
}
