import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from './Header';
import InputField from '../formFields/InputField';
import User from '../data/User';

// eslint-disable-next-line no-useless-escape
const EMAIL = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

class SignUp extends React.Component {
  state = {
    newMember: {
      name: '',
      email: '',
      password: '',
    },
    redirectCheck: false,
    showModal: false,
    formErrors: { name: '', email: '', password: '' },
  }

  onRedirect() {
    const { redirectCheck } = this.state;
    if (redirectCheck) {
      return <Redirect to="/login" />;
    }
    return '';
  }

  handleSubmit = (event) => {
    const { newMember } = this.state;
    event.preventDefault();
    User.push(newMember);
    this.open();
  }

  handleChange = (event) => {
    event.preventDefault();
    const {
      name, value, email, password,
    } = event.target;
    const { newMember, formErrors } = this.state;
    switch (name) {
      case 'name':
        formErrors.name = value.length < 3 || value.length > 30 ? 'Length of Name is not in range' : '';
        break;
      case 'email':
        formErrors.email = EMAIL.test(value) && value.length > 0 ? '' : 'Invalueid Email Address.';
        break;
      case 'password':
        formErrors.password = value.length > 5 ? '' : 'Password is not in range';
        break;
      default:
        break;
    }
    newMember[name] = value;
    newMember[email] = email;
    newMember[password] = password;
    this.setState({ formErrors, newMember });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  redirectToLogin = () => {
    this.setState({ redirectCheck: true });
  }

  render() {
    const { formErrors, newMember, showModal } = this.state;
    const isValid = newMember.name.length > 0
                      && newMember.password.length > 5 && newMember.email.length > 7;
    return (
      <div className="display-container">
        <div>
          <Header />
        </div>
        <br />
        <p className="text-center display-4">Create an account</p>
        <form onSubmit={this.handleSubmit} className="form-container">
          {this.onRedirect()}
          <div className="form-group">
            <InputField
              inputType="text"
              title="Full Name"
              name="name"
              value={newMember.name}
              placeholder="Enter Full Name"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.name.length > 0 && (
          <span className="err">{formErrors.name}</span>
          )}
          <div className="form-group">
            <InputField
              inputType="email"
              title="E-Mail"
              name="email"
              value={newMember.email}
              placeholder="Enter E-Mail"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.email.length > 0 && (
          <span className="err">{formErrors.email}</span>
          )}
          <div className="form-group">
            <InputField
              inputType="password"
              title="Password"
              name="password"
              value={newMember.password}
              placeholder="Enter Password"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.password.length > 0 && (
          <span className="err">{formErrors.password}</span>
          )}
          <br />
          <Button variant="primary" value="Sign Up" type="submit" disabled={!isValid}>Sign Up</Button>
        </form>
        <Modal show={showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> The registration has done successfully!!!!!!!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.redirectToLogin}>Login To Portal</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
