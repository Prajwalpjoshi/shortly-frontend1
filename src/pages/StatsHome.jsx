import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StatsHome() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!code.trim()) return;
    navigate(`/code/${code}`);
  }

  return (
    <div className="card">
      <h2>View Status</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter short code"
        />

        <button>View Status</button>
      </form>
    </div>
  );
}
