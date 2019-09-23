import {GET_SUBS} from '../actions/ActionTypes';

const initialsState = {
  subs: [],
};

export default function(state = initialsState, action ) {
  switch (action.type) {
  case GET_SUBS:
    return {
      ...state,
      subs: action.subsInfo,
    };
  default:
    return state;
  }
}
