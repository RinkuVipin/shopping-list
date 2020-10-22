import React, { useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  logInAction: () => {},
});

const AuthContextProvider = (props) => {
  const [logIn, setLogIn] = useState(false);

  const logInHandler = () => {
    setLogIn(true);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: logIn, logInAction: logInHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
