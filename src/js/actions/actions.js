import actionTypes from "./actionTypes";

export function signUp(user) {
  return dispatch => {
    dispatch({
      type: actionTypes.SIGN_UP,
      user: user
    });
  }
}

export function login(user) {
  return dispatch => {
    dispatch({
        type: actionTypes.LOGIN,
        user: user
    });
  }
}

export function logout(user) {
  return dispatch => {
    dispatch({
        type: actionTypes.LOGOUT
    });
  }
}
