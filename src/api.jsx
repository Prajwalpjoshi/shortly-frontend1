
// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export async function createLink({ target, code }) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target, code })
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw { status: res.status, body };
  return body;
}

export async function listLinks() {
  const res = await fetch(`${API_BASE}/api/links`);
  if (!res.ok) throw new Error('failed');
  return res.json();
}

export async function getLink(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`);
  if (!res.ok) {
    const b = await res.json().catch(() => null);
    throw { status: res.status, body: b };
  }
  return res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`, { method: 'DELETE' });
  return res;
}
