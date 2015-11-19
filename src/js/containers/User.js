import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import UserRow from "../components/UserRow";
import {
  Panel
} from "react-bootstrap";

@connect(state => {
  return {
    current: state.users.current
  };
})
export default class User extends React.Component {
  static propTypes = {
    current: React.PropTypes.object
  }

  static contextTypes = {
    actions: React.PropTypes.object.isRequired
  }

  render() {
    const {current} = this.props;

    if (!current) {
      return(<div></div>);
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
