import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import history from "../history";

const UserSignIn = ({ handleSignIn, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // on form submit uses the handleSignIn function provided through props
  const onSubmit = async (e) => {
    e.preventDefault();
    handleSignIn(email, password);
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign In
              </button>
              <a className="button button-secondary" href="/">
                Cancel
              </a>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Don't have a user account? <a href="/signup">Click here</a> to sign
          up!
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
