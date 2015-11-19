import React from "react";
import _ from "lodash";
import {
  Nav,
  Navbar,
  NavItem
} from "react-bootstrap";

export default class Header extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <Navbar fluid>
        <Nav right>
          <NavItem eventKey={1} href="#" onClick={this.handleLogout}>Logout</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
