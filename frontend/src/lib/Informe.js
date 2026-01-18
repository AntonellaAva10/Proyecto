// lib/InformeServicio.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function getInformes(token) {
  const res = await fetch(`${API_URL}/informes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getInformeById(id, token) {
  const res = await fetch(`${API_URL}/informes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createInforme(data, token) {
  const res = await fetch(`${API_URL}/informes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
