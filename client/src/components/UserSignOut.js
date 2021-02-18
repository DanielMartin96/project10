import React, { useEffect } from "react";
import history from "../history";

const UserSignOut = ({ handleSignOut }) => {
  useEffect(() => {
    handleSignOut();
    history.push("/");
  });

  return <div></div>;
};

export default UserSignOut;
