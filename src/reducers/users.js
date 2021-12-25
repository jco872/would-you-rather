import { RECEIVE_USERS, LOGOUT_USER } from '../actions/users';

export default function users (state={}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case LOGOUT_USER:
      return {
        ...state,
        ...action.users
      }      
    default:
      return state;
  }
}