const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function trackArticle(trackingNumber) {
  const response = await fetch(
    `${API_URL}/tracking/${encodeURIComponent(trackingNumber)}`
  );
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch tracking information.");
  }

  return data;
}
