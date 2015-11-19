import React from "react";
import {Link} from "react-router";
import t from "tcomb-form";

const Form = t.form.Form;

const Request = t.struct({
  username: t.Str,
  password: t.Str
});

const defaultState = {
  value: {},
  options: {
    auto: "placeholders",
    fields: {
      password: {
        type: "password"
      }
    }
  }
};

export default class SignUp extends React.Component {
  static contextTypes = {
    actions: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.state = defaultState;
  }

  onChange = (value) => {
    this.setState({value});
  }

  handleSubmit = () => {
    const value = this.refs.form.getValue();

    if (value) {
      this.context.actions.login(value);
    }
  }

  render() {
    return(
      <div>
        <Form onChange={this.onChange}
          options={this.state.options}
          ref="form"
          type={Request}
          value={this.state.value} />

        <button className="btn btn-primary btn-block"
          onClick={this.handleSubmit} >
          Login
        </button>

        <Link to="/sign_up">Sign Up</Link>
        <Link to="/users">Users</Link>
      </div>
    );
  }
}
