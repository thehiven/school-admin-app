import React from 'react';
import { Link } from 'react-router-dom';

const SignedInNav = ({firstName, lastName}) => {
  return (
    <nav>
      <span>Welcome {firstName} {lastName}!</span>
      <Link as="a" className="signout" to="/signout">Sign Out</Link>
    </nav>
  );
};

const SignedOutNav = () => {
  return (
    <nav>
      <Link as='a' className="signup" to="/signup">Sign Up</Link>
      <Link as='a' className="signin" to ="/signin">Sign In</Link>
    </nav>
  );
};

const Header = (props) => {
  const authStatus = props.authStatus;
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {authStatus.userSignedIn ? <SignedInNav firstName={authStatus.user.firstName} lastName={authStatus.user.lastName} /> : <SignedOutNav />}
      </div>
    </div>
  );
}

export default Header;