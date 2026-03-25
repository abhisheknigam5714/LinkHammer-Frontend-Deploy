import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHammer } from "react-icons/fa";
import React from "react";
const Navbar = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-danger px-4">
      <Link
        className="navbar-brand fw-bold d-flex align-items-center gap-2"
        to="/"
      >
        <FaHammer /> Link Hammer
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto gap-2 align-items-md-center">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">
              About
            </Link>
          </li>
          {token && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
          )}
          {!token ? (
            <li className="nav-item">
              <Link
                className="btn btn-light text-danger fw-bold"
                to="/register"
              >
                Sign Up
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <button
                className="btn btn-outline-light fw-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
