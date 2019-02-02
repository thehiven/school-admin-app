import React from 'react';
import { Redirect } from 'react-router-dom';

// stateless components used to sign out users
// after calling signout request function on App component redirects users to index page
const SignOut = (props) => {
  props.signOutRequest();
  return (
    <Redirect to="/" />
  );
}

export default SignOut;