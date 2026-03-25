import {
  FaHammer,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-danger text-white py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div>
          <h5 className="fw-bold mb-1">
            <FaHammer className="me-2" />
            Link Hammer
          </h5>
          <small>Simplifying URL shortening for efficient sharing</small>
        </div>
        <small>&copy; 2024 Link Hammer. All rights reserved.</small>
        <div className="d-flex gap-3">
          <a href="#" className="text-white">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-white">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-white">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-white">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
