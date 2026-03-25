import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaLink,
  FaChartBar,
  FaShieldAlt,
  FaBolt,
  FaHammer,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLink className="text-danger" size={28} />,
    title: "Simple URL Shortening",
    desc: "Create short, memorable URLs in seconds with our easy-to-use interface.",
  },
  {
    icon: <FaChartBar className="text-danger" size={28} />,
    title: "Powerful Analytics",
    desc: "Track clicks and performance with our comprehensive analytics dashboard.",
  },
  {
    icon: <FaShieldAlt className="text-danger" size={28} />,
    title: "Enhanced Security",
    desc: "All shortened URLs are protected with advanced encryption.",
  },
  {
    icon: <FaBolt className="text-danger" size={28} />,
    title: "Fast & Reliable",
    desc: "Lightning-fast redirects with high uptime infrastructure.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <div className="container py-5">
      {/* Hero */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="fw-bold display-5 text-dark">
            <FaHammer className="text-danger me-2" />
            Link Hammer
          </h1>
          <p className="text-muted fs-5 my-3">
            Simplify your URLs. Perfect for affiliate marketing and sharing
            trusted links with your audience.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button
              className="btn btn-danger px-4 py-2 fw-semibold"
              onClick={() => navigate(token ? "/dashboard" : "/login")}
            >
              {token ? "Go to Dashboard" : "Get Started"}
            </button>
            <button
              className="btn btn-outline-danger px-4 py-2 fw-semibold"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div className="bg-danger bg-opacity-10 rounded-3 p-5">
            <FaHammer size={80} className="text-danger" />
            <h4 className="fw-bold mt-3 text-danger">Hammer Your Links!</h4>
            <p className="text-muted">
              Turn long URLs into powerful short links
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <h3 className="text-center fw-bold mb-4">Why Choose Link Hammer?</h3>
      <div className="row g-4">
        {features.map((f, i) => (
          <div key={i} className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 p-3 text-center">
              <div className="mb-2">{f.icon}</div>
              <h6 className="fw-bold">{f.title}</h6>
              <p className="text-muted small mb-0">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
