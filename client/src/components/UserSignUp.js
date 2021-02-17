import React, { useState } from "react";
import axios from "axios";
import history from "../history";

const UserSignUp = ({ handleSignIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === password2) {
      renderErrors();
      const res = await axios.post("http://localhost:5000/api/users", {
        firstName,
        lastName,
        emailAddress,
        password,
      });
      if (res.status === 201) {
        handleSignIn(emailAddress, password);
        history.push("/");
      }
    } else {
      setErrors(true);
      setPasswordMatchError("Passwords must match");
    }
  };

  const renderErrors = () => {
    if (firstName.length === 0) {
      setFirstNameError('Please provide a value for "First Name"');
      setErrors(true);
    }

    if (firstName.length > 0) {
      setFirstNameError("");
    }
    if (lastName.length === 0) {
      setLastNameError('Please provide a value for "Last Name"');
      setErrors(true);
    }

    if (lastName.length > 0) {
      setLastNameError("");
    }

    if (emailAddress.length === 0) {
      setEmailAddressError('Please provide a value for "Email Address"');
      setErrors(true);
    }

    if (emailAddress.length > 0) {
      setEmailAddressError("");
    }

    if (password.length === 0) {
      setPasswordError('Please provide a value for "Password"');
      setErrors(true);
    }

    if (password.length > 0) {
      setPasswordError("");
    }
  };

  console.log(handleSignIn);

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        {errors ? (
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul className="errors">
                <li>{firstNameError}</li>
                <li>{lastNameError}</li>
                <li>{emailAddressError}</li>
                <li>{passwordError}</li>
                <li>{passwordMatchError}</li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <h1>Sign Up</h1>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className=""
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
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
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign Up
              </button>
              <button href="/">Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account? <a href="/signin">Click here</a> to sign
          in!
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
