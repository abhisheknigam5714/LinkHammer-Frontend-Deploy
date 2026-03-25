import { createContext, useContext, useState } from "react";
import React from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getToken = () => {
    const t = localStorage.getItem("JWT_TOKEN");
    return t ? JSON.parse(t) : null;
  };

  const [token, setTokenState] = useState(getToken);

  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("JWT_TOKEN", JSON.stringify(newToken));
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
