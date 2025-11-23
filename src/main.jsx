import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Stats from "./pages/Stats.jsx";
import Health from "./pages/Health.jsx";
import StatusHome from "./pages/StatsHome.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="status" element={<StatusHome />} />
        <Route path="code/:code" element={<Stats />} />
        <Route path="health" element={<Health />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
