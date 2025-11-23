import React, { useEffect, useState } from "react";
import { listLinks, createLink, deleteLink } from "../api";
import LinkRow from "../components/LinkRow";

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  // 🔍 Search state
  const [search, setSearch] = useState("");

  // ---------------------------------------------------
  // Load links + Auto refresh (every 10 seconds)
  // ---------------------------------------------------
  async function fetchLinks() {
    try {
      setLoading(true);
      const data = await listLinks();
      setLinks(data);
    } catch {
      setError("Failed to load links.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchLinks();

    const interval = setInterval(() => {
      fetchLinks();
    }, 10000); // 10 seconds refresh

    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------
  // Create link
  // ---------------------------------------------------
  async function handleCreate(e) {
    e.preventDefault();
    setError(null);

    if (!target) return setError("Please enter a URL.");

    try {
      new URL(target);
    } catch {
      return setError("Invalid URL format.");
    }

    if (code && !CODE_REGEX.test(code)) {
      return setError("Code must be 6–8 alphanumeric characters.");
    }

    setCreating(true);
    try {
      await createLink({ target, code: code || undefined });
      setTarget("");
      setCode("");
      await fetchLinks();
    } catch (err) {
      if (err.status === 409) setError("This code already exists.");
      else setError("Something went wrong.");
    }
    setCreating(false);
  }

  // ---------------------------------------------------
  // Delete link
  // ---------------------------------------------------
  async function handleDelete(code) {
    if (!confirm("Delete this link?")) return;
    await deleteLink(code);
    setLinks((prev) => prev.filter((l) => l.code !== code));
  }

  // ---------------------------------------------------
  // Filtering links (Code OR URL)
  // ---------------------------------------------------
  const filteredLinks = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ---------------------------------------------------
          CREATE NEW LINK CARD
      --------------------------------------------------- */}
      <section className="card">
        <h2 style={{ marginBottom: "10px" }}>Create Short Link</h2>

        <form className="form" onSubmit={handleCreate}>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter long URL (https://example.com)"
          />

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Custom code (optional)"
          />

          <button disabled={creating}>
            {creating ? "Creating..." : "Create Link"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </section>

      {/* ---------------------------------------------------
          LINKS TABLE + SEARCH
      --------------------------------------------------- */}
      <section className="card">
        <h2 style={{ marginBottom: "10px" }}>Your Links</h2>

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {loading ? (
          <p>Loading...</p>
        ) : filteredLinks.length === 0 ? (
          <p>No matching links found.</p>
        ) : (
          <table className="links-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Target URL</th>
                <th>Clicks</th>
                <th>Last Clicked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((l) => (
                <LinkRow key={l.code} link={l} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
