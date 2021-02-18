import React, { useEffect } from "react";

const UserSignOut = ({ handleSignOut }) => {
  // use effect runs like componentdidmount() - runs when the component is mounted
  useEffect(() => {
    handleSignOut();
  });

  return <div></div>;
};

export default UserSignOut;
