import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/actions";

import {
  Alert
} from "react-bootstrap";

import {
  Login,
  SignUp
} from "./";
import Header from "../components/Header";

@connect(state => {
  return {
    users: state.users
  };
})
export default class App extends Component {
  static propTypes = {
    users: React.PropTypes.object.isRequired
  }

  static childContextTypes = {
    actions: React.PropTypes.object,
    users: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.actions = this.createActions(props.dispatch);
  }

  componentWillReceiveProps(nextProps) {
    this.actions = this.createActions(nextProps.dispatch);

    if (nextProps.users.isAuthenticated !== this.props.users.isAuthenticated) {
      if (!nextProps.users.isAuthenticated) {
        this.props.history.pushState(null, `/login`);
      } else {
        this.props.history.pushState(null, `/user/${nextProps.users.current.username}`);
      }
    }

    if (this.props.users.error) {
      this.props.users.error = null;
    }
  }

  createActions(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }

  getChildContext() {
    return {
      actions: this.actions,
      users: this.props.users
    };
  }

  render() {
    const {users} = this.props;
    const children = this.props.content || this.props.children;

    let error;
    if (users.error) {
      error = (
        <Alert bsStyle="danger">
          {users.error}
        </Alert>
      );
    }

    return (
      <div>
        {users.isAuthenticated && <Header actions={this.actions} />}
        <main>
          {children}
        </main>
        {error}
      </div>
    );
  }
}
