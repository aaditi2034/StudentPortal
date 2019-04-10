import React from 'react';
import { Redirect } from 'react-router-dom';
import user from '../data/User';
import Header from './Header';
import InputField from '../formFields/InputField';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      member: {
        email: '',
        password: '',
      },
      redirectCheck: false,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { member } = this.state;
    member[name] = value;
    this.setState({ member });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { member } = this.state;
    for (let index = 0; index < user.length; index += 1) {
      if (user[index].email === member.email && user[index].password === member.password) {
        this.setState({ redirectCheck: true });
      }
    }
  }

  redirect() {
    const { redirectCheck, member } = this.state;
    if (redirectCheck) {
      return (
        <Redirect to={{
          pathname: '/studentPortal',
          state: { userName: member.email },
        }}
        />
      );
    }
    return '';
  }

  render() {
    const { member } = this.state;
    return (
      <div className="display-container">
        <div>
          <Header />
        </div>
        <br />
        <form onSubmit={this.handleSubmit} className="form-container">
          {this.redirect()}
          <div className="form-group">
            <InputField
              inputType="email"
              title="E-Mail"
              name="email"
              value={member.email}
              placeholder="Enter E-Mail"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <InputField
              inputType="password"
              title="Password"
              name="password"
              placeholder="Enter Password"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
