import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, handleSignOut }) => {
  const renderHeader = () => {
    if (!user) {
      return (
        <nav>
          <Link className="signup" to="/signup">
            Sign Up
          </Link>
          <a className="signin" href="/signin">
            Sign In
          </a>
        </nav>
      );
    } else {
      return (
        <nav>
          <span>{`Welcome ${user.firstName} ${user.lastName}`}</span>
          <a className="signout" href="/" onClick={handleSignOut}>
            Sign Out
          </a>
        </nav>
      );
    }
  };

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        {renderHeader()}
      </div>
    </div>
  );
};

export default Header;
