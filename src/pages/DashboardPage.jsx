import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { FaCopy, FaCheck, FaChartBar, FaLink, FaPlus } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import React from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const DashboardPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [urls, setUrls] = useState([]);
  const [totalClicks, setTotalClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [analyticsMap, setAnalyticsMap] = useState({});
  const [analyticsLoading, setAnalyticsLoading] = useState({});

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [urlsRes, clicksRes] = await Promise.all([
        api.get("/api/urls/myurls", authHeaders),
        api.get(
          "/api/urls/totalClicks?startDate=2024-01-01&endDate=2026-12-31",
          authHeaders,
        ),
      ]);
      const sorted = urlsRes.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      );
      setUrls(sorted);

      const clickArray = Object.keys(clicksRes.data).map((key) => ({
        clickDate: key,
        count: clicksRes.data[key],
      }));
      setTotalClicks(clickArray);
    } catch (error) {
      navigate("/error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    setCreating(true);
    try {
      await api.post("/api/urls/shorten", { originalUrl: newUrl }, authHeaders);
      toast.success("Short URL created!");
      setNewUrl("");
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to create short URL");
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = (id, shortUrl) => {
    const fullUrl = `${import.meta.env.VITE_FRONT_END_URL}/s/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAnalytics = async (shortUrl) => {
    if (analyticsMap[shortUrl] !== undefined) {
      setAnalyticsMap((prev) => {
        const updated = { ...prev };
        delete updated[shortUrl];
        return updated;
      });
      return;
    }
    setAnalyticsLoading((prev) => ({ ...prev, [shortUrl]: true }));
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${shortUrl}?startDate=2024-01-01T00:00:00&endDate=2026-12-31T23:59:59`,
        authHeaders,
      );
      setAnalyticsMap((prev) => ({ ...prev, [shortUrl]: data }));
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setAnalyticsLoading((prev) => ({ ...prev, [shortUrl]: false }));
    }
  };

  const buildChartData = (data) => ({
    labels: data.map((d) => d.clickDate),
    datasets: [
      {
        label: "Clicks",
        data: data.map((d) => d.count),
        backgroundColor: "#dc3545",
        borderRadius: 4,
      },
    ],
  });

  const totalChartData = {
    labels: totalClicks.map((d) => d.clickDate),
    datasets: [
      {
        label: "Total Clicks",
        data: totalClicks.map((d) => d.count),
        backgroundColor: "#dc3545",
        borderRadius: 4,
      },
    ],
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-danger" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-danger mb-0">My Dashboard</h3>
        <button
          className="btn btn-danger"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus className="me-1" />
          {showForm ? "Cancel" : "New Short URL"}
        </button>
      </div>

      {showForm && (
        <div className="card shadow-sm mb-4 p-3">
          <form onSubmit={handleCreate} className="d-flex gap-2 flex-wrap">
            <input
              type="url"
              className="form-control"
              placeholder="https://your-long-url.com"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              required
              style={{ flex: 1, minWidth: "200px" }}
            />
            <button
              type="submit"
              className="btn btn-danger fw-semibold"
              disabled={creating}
            >
              {creating ? "Creating..." : "Shorten"}
            </button>
          </form>
        </div>
      )}

      <div className="card shadow-sm mb-4 p-3">
        <h5 className="fw-semibold mb-3">Total Clicks Overview</h5>
        {totalClicks.length === 0 ? (
          <p className="text-muted text-center py-4">
            No click data yet. Share your links to see stats!
          </p>
        ) : (
          <div style={{ height: "250px" }}>
            <Bar
              data={totalChartData}
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          </div>
        )}
      </div>

      <h5 className="fw-semibold mb-3">My Links</h5>
      {urls.length === 0 ? (
        <div className="text-center py-5">
          <FaLink className="text-muted mb-2" size={32} />
          <p className="text-muted">You haven't created any short links yet.</p>
        </div>
      ) : (
        urls.map((item) => (
          <div key={item.id} className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <a
                    href={`${import.meta.env.VITE_FRONT_END_URL}/s/${item.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-danger fw-bold text-decoration-none"
                  >
                    /s/{item.shortUrl}
                  </a>
                  <p
                    className="text-muted mb-1 text-truncate"
                    style={{ maxWidth: "400px" }}
                  >
                    {item.originalUrl}
                  </p>
                  <div className="d-flex gap-3 text-muted small">
                    <span>
                      🖱 {item.clickCount}{" "}
                      {item.clickCount === 1 ? "click" : "clicks"}
                    </span>
                    <span>
                      📅 {dayjs(item.createdDate).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleCopy(item.id, item.shortUrl)}
                  >
                    {copiedId === item.id ? <FaCheck /> : <FaCopy />}
                    <span className="ms-1">
                      {copiedId === item.id ? "Copied" : "Copy"}
                    </span>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleAnalytics(item.shortUrl)}
                  >
                    <FaChartBar className="me-1" />
                    Analytics
                  </button>
                </div>
              </div>

              {analyticsLoading[item.shortUrl] && (
                <div className="text-center mt-3">
                  <div className="spinner-border spinner-border-sm text-danger" />
                </div>
              )}

              {analyticsMap[item.shortUrl] !== undefined &&
                !analyticsLoading[item.shortUrl] && (
                  <div className="mt-3 border-top pt-3">
                    {analyticsMap[item.shortUrl].length === 0 ? (
                      <p className="text-muted text-center">
                        No click data for this link yet.
                      </p>
                    ) : (
                      <div style={{ height: "200px" }}>
                        <Bar
                          data={buildChartData(analyticsMap[item.shortUrl])}
                          options={{
                            maintainAspectRatio: false,
                            responsive: true,
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardPage;
