import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import React from "react";

const PrivateRoute = ({ children, publicPage }) => {
  const { token } = useAuth();

  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
