import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleInputChange, handleCancel, handleRequestFailure, ValidationError } from '../utils/Utils';

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      validationError: ''
    };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = handleCancel.bind(this);
    this.handleFailure = handleRequestFailure.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signUpRequest(this.state, this.props.history, this.handleFailure);
  }

  render() {
    const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ValidationError message={this.state.validationError} />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} onChange={this.handleInputChange}></input>
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} onChange={this.handleInputChange}></input>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={this.handleInputChange}></input>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={this.handleInputChange}></input>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={confirmPassword} onChange={this.handleInputChange}></input>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
      </div>
    ); 
  }
};

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: '',
      validationError: ''
    };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = handleCancel.bind(this);
    this.handleFailure = handleRequestFailure.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signInRequest(this.state.emailAddress, this.state.password, this.props.history, this.handleFailure);
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <ValidationError message={this.state.validationError} />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleInputChange}></input>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}></input>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link as="a" to="/users/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
};