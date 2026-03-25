import React from "react";
import { FaLink, FaChartBar, FaShieldAlt, FaBolt } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-danger mb-2">About Link Hammer</h2>
      <p className="text-muted mb-4" style={{ maxWidth: "600px" }}>
        Link Hammer is a URL shortening platform built for affiliate marketers
        and digital creators who need trusted, trackable short links that users
        can rely on.
      </p>
      <div className="row g-4" style={{ maxWidth: "700px" }}>
        {[
          {
            icon: <FaLink className="text-primary" size={28} />,
            title: "Simple URL Shortening",
            desc: "Generate short links instantly with a clean interface.",
          },
          {
            icon: <FaChartBar className="text-success" size={28} />,
            title: "Powerful Analytics",
            desc: "Track click data and optimize your marketing strategies.",
          },
          {
            icon: <FaShieldAlt className="text-warning" size={28} />,
            title: "Enhanced Security",
            desc: "Links are secured with encryption keeping your data safe.",
          },
          {
            icon: <FaBolt className="text-danger" size={28} />,
            title: "Fast & Reliable",
            desc: "Lightning-fast redirects with 99.9% uptime.",
          },
        ].map((item, i) => (
          <div key={i} className="col-12">
            <div className="d-flex align-items-start gap-3">
              <div>{item.icon}</div>
              <div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
