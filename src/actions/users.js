export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOGOUT_USER = 'LOGOUT_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}