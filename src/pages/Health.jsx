import React, { useEffect, useState } from "react";

export default function Health() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchHealth() {
    try {
      const res = await fetch("http://localhost:3001/healthz");
      const data = await res.json();
      setHealth(data);
    } catch {
      setHealth({ ok: false });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2 style={{ marginBottom: "10px" }}>System Health</h2>

      <p>
        <strong>Status:</strong> {health.ok ? "🟢 OK" : "🔴 DOWN"}
      </p>
      <p>
        <strong>Version:</strong> {health.version}
      </p>
      <p>
        <strong>Uptime:</strong> {Math.floor(health.uptime_seconds)} seconds
      </p>
    </div>
  );
}
