import React, { useEffect } from "react";

const UserSignOut = ({ handleSignOut }) => {
  useEffect(() => {
    handleSignOut();
  });

  return <div></div>;
};

export default UserSignOut;
