import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenRedirectPage = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      // ✅ This calls your backend RedirectController GET /{shortUrl}
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`;
    }
  }, [shortUrl]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center">
        <div className="spinner-border text-danger mb-3" />
        <p className="text-muted">Redirecting you...</p>
      </div>
    </div>
  );
};

export default ShortenRedirectPage;
