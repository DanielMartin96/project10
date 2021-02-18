import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./styles/global.css";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import history from "./history";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import UserSignOut from "./components/UserSignOut";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) || null
  );
  const [authCred, setAuthCred] = useState(
    window.localStorage.getItem("auth") || null
  );

  // signs in user with the data from the form
  const handleSignIn = async (username, password) => {
    const user = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    // sets auth info and user in local storage
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user.data));
      setUser(user.data);
      window.localStorage.setItem(
        "auth",
        `Basic ${btoa(`${username}:${password}`)}`
      );
      setAuthCred(`Basic ${btoa(`${username}:${password}`)}`);
      history.push("/");
      window.location.reload();
    }

    return null;
  };

  // removes all credentials from local storage
  const handleSignOut = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    window.localStorage.removeItem("auth");
    setAuthCred(null);
    history.push("/");
    window.location.reload();
  };

  return (
    <Router history={history}>
      <Header user={user} handleSignOut={handleSignOut} />
      <hr />
      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>
        <Route path="/signin">
          <UserSignIn handleSignIn={handleSignIn} />
        </Route>
        <Route path="/signout">
          <UserSignOut handleSignOut={handleSignOut} />
        </Route>
        <Route path="/signup">
          <UserSignUp handleSignIn={handleSignIn} />
        </Route>
        <PrivateRoute
          path="/courses/create"
          auth={authCred}
          component={CreateCourse}
        />
        <Route exact path="/courses/:id">
          <CourseDetail auth={user} />
        </Route>
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourse}
          auth={authCred}
        />
      </Switch>
    </Router>
  );
};

export default App;
