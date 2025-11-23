import React from "react";
import { Link } from "react-router-dom";

export default function LinkRow({ link, onDelete }) {
  const base = import.meta.env.VITE_BASE_URL || window.location.origin;
  const shortUrl = `${base}/${link.code}`;

  return (
    <tr>
      <td>
        <Link
          to={`/code/${link.code}`}
          style={{ fontWeight: 600, color: "#2563eb" }}
        >
          {link.code}
        </Link>
      </td>

      <td className="truncate" title={link.target}>
        <a href={link.target} target="_blank">
          {link.target}
        </a>
      </td>

      <td>{link.clicks}</td>

      <td>
        {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "—"}
      </td>

      <td>
        <button
          className="table-btn copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(shortUrl);
            alert("Copied: " + shortUrl);
          }}
        >
          Copy
        </button>

        <button
          className="table-btn delete-btn"
          onClick={() => onDelete(link.code)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
