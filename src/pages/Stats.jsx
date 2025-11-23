import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLink } from "../api";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const data = await getLink(code);
        setLink(data);
      } catch {
        setErr("Link not found.");
      }
      setLoading(false);
    }
    fetchStats();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p className="error">{err}</p>;

  return (
    <div className="card">
      <h2 style={{ marginBottom: "10px" }}>Stats for {link.code}</h2>

      <div className="stats-info">
        <p>
          <strong>Target:</strong>{" "}
          <a href={link.target} target="_blank">
            {link.target}
          </a>
        </p>
        <p>
          <strong>Total Clicks:</strong> {link.clicks}
        </p>
        <p>
          <strong>Last Clicked:</strong>{" "}
          {link.last_clicked
            ? new Date(link.last_clicked).toLocaleString()
            : "—"}
        </p>
        <p>
          <strong>Created:</strong> {new Date(link.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
