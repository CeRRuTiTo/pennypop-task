import {createHistory} from "history";
import React from "react";
import {applyMiddleware, createStore, compose} from "redux";
import {Redirect, Router, Route} from "react-router";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reducers from "../reducers";

import App from "./App";
import {
  Inside,
  Login,
  SignUp,
  User,
  Users
} from "./";

const store = compose(
  applyMiddleware(thunk),
)(createStore)(reducers);

const history = createHistory();

function requireAuth(nextState, replaceState) {
  const state = store.getState();
  if (!state.users.isAuthenticated)
    replaceState({nextPathname: nextState.location.pathname}, '/login')
}

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route component={SignUp} path="/sign_up" />
            <Route component={Login} path="/login" />
            <Route component={Users} path="/users" />
            <Route component={User} path="/user/:username" onEnter={requireAuth} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
