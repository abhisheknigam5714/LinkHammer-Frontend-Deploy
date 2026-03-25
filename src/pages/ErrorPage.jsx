import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import React from "react";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <FaExclamationTriangle className="text-danger mb-3" size={60} />
      <h2 className="fw-bold">Oops! Something went wrong.</h2>
      <p className="text-muted mb-4">
        {message || "An unexpected error occurred."}
      </p>
      <button className="btn btn-danger px-4" onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
