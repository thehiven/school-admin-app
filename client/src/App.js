import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Header from './components/Header';
import { SignUp, SignIn } from './components/SignForms';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import CourseUpdate from './components/CourseUpdate';
import SignOut from './components/SignOut';

// high order component that returns either <Route> or <Redirect> depending on auth status
const PrivateRoute = ({authStatus, component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => authStatus.userSignedIn ? <Component {...props} authStatus={authStatus} /> : <Redirect to="/signin" />} />
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authStatus: {
        userSignedIn: false,
        user: {}
      }
    };

    this.signUpRequest = this.signUpRequest.bind(this);
    this.signInRequest = this.signInRequest.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  // request to create new user
  // failure callback is used to display user friendly validation errors
  signUpRequest(dataObject, history, failureCallback) {
    Axios.post('http://localhost:5000/api/users', dataObject)
      .then(response => {
        this.signInRequest(dataObject.emailAddress, dataObject.password, history, (message) => console.log(message));
      })
      .catch(error => {
        failureCallback(error.response.data.message);
        console.log(error);
      });
  }

  // request to authentificate user
  signInRequest(emailAddress, password, history, failureCallback) {
    Axios.get('http://localhost:5000/api/users', {
      auth: {
        username: emailAddress,
        password: password
      }
    })
    .then(response => {
      response.data.password = password; // save actual password instead of hash string
      this.setState({
        authStatus: {
          userSignedIn: true,
          user: response.data
        }
      });
      history.push('/');
    })
    .catch(error => {
      failureCallback(error.response.data.message);
      console.log(error);
    });
  }

  // clear user information
  handleSignOut() {
    this.setState({
      authStatus: {
        userSignedIn: false,
        user: {}
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Header authStatus={this.state.authStatus} />
          
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourse} authStatus={this.state.authStatus} />
            <Route exact path="/courses/:id" render={(props) => <CourseDetails {...props} authStatus={this.state.authStatus} />}  />
            <PrivateRoute path="/courses/:id/update" component={CourseUpdate} authStatus={this.state.authStatus} />
            <Route path="/signup" render={(props) => <SignUp {...props} signUpRequest={this.signUpRequest} />} />
            <Route path="/signin" render={(props) => <SignIn {...props} signInRequest={this.signInRequest} />} />
            <Route path="/signout" render={(props) => <SignOut {...props} signOutRequest={this.handleSignOut} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
