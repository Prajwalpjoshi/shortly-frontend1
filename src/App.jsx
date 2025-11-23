import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./app.css";

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="brand">
          Shortly
        </Link>

        <nav className="nav-links">
          <Link to="/status" className="nav-link">
            Status |
          </Link>

          <Link to="/health" className="nav-link">
            Health
          </Link>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        Built by Prajwal Joshi • URL Shortener Project
      </footer>
    </div>
  );
}
