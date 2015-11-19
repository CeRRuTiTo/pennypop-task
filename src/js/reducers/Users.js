import _ from "lodash";
import actionTypes from "../actions/actionTypes";
import store from "store2";

const initialState = store("state") || {
  isAuthenticated: false,
  current: null,
  error: null,
  users: []
};

function persist(state) {
  store("state", state);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      if (_.findWhere(state.users, {username: action.user.username})) {
        state = Object.assign({}, state, {
          error: "Username is already taken. Please, choose another one."
        });

        return state;
      }

      state = Object.assign({}, state, {
        isAuthenticated: true,
        current: action.user,
        error: null,
        users: [
          ...state.users,
          action.user
        ]
      });

      persist(state);

      return state;


    case actionTypes.LOGIN:
      let current = _.findWhere(state.users, action.user);

      if (!current) {
        state = Object.assign({}, state, {
          error: "Authentication failed. Please, try again."
        });

        return state;
      }

      state = Object.assign({}, state, {
        isAuthenticated: true,
        error: null,
        current
      });

      persist(state);

      return state;

    case actionTypes.LOGOUT:
      state = Object.assign({}, state, {
        isAuthenticated: false,
        current: null
      });

      persist(state);

      return state;

    default:
      return state;
  }
};

