import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import _ from "lodash";
import UserRow from "../components/UserRow";
import {
  Table
} from "react-bootstrap";

@connect(state => {
  return {
    users: state.users
  };
})
export default class Users extends React.Component {
  static propTypes = {
    users: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    actions: React.PropTypes.object.isRequired
  }

  render() {
    const {users} = this.props;

    const userRows = users.users.map((user, key) => {
      return (<UserRow key={key} id={key} {...user}/>);
    });

    return(
      <div>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {userRows}
          </tbody>
        </Table>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
