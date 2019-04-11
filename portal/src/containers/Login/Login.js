/* eslint-disable no-alert */
import React from 'react';
import { Redirect } from 'react-router-dom';
import user from '../../data/User';
import Header from '../../components/MainHeader/Header';
import InputField from '../../formFields/InputField';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      member: {
        email: '',
        password: '',
      },
      redirectCheck: false,
      error: '',
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
      } else if (member.email === '' && member.password === '') {
        this.setState({ error: 'Enter Userename and Password' });
      } else if (member.email === '') {
        this.setState({ error: 'Enter Email for login' });
      } else if (member.password === '') {
        this.setState({ error: 'Enter password for login' });
      } else {
        this.setState({ error: 'Email or password is incorrect' });
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
    const { member, error } = this.state;
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
          <div className="error">{error}</div>
        </form>
      </div>
    );
  }
}

export default Login;
