import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import _ from "lodash";
import UserRow from "../components/UserRow";
import {
  Alert,
  Panel
} from "react-bootstrap";

@connect(state => {
  return {
    current: state.users.current
  };
})
export default class User extends React.Component {
  static propTypes = {
    current: React.PropTypes.object,
    params: React.PropTypes.shape({
      username: React.PropTypes.string.isRequired
    }),
  }

  static contextTypes = {
    actions: React.PropTypes.object.isRequired
  }

  render() {
    const {current} = this.props;

    if (!current) {
      return(<div></div>);
    }

    if (this.props.params.username !== current.username) {
      return(
        <Alert bsStyle="danger">
          <p>Ops, something went wrong.</p>
          <p>You can go to your profile by following this link:</p>
          <p><Link to={`/user/${current.username}`}>User Profile</Link></p>
        </Alert>
      );
    }

    const title = `Hello ${current.username}!`;
    const full_name = `${current.first_name} ${current.last_name}`;

    return(
      <Panel header={title} bsStyle="success">
        <p>Your full name is: {full_name}</p>
      </Panel>
    );
  }
}
