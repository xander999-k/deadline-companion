// ─── swap this one line when your Render URL changes ───
const API_BASE = import.meta.env.VITE_API_URL ?? "https://grik-ai.onrender.com";

export async function analyzeText(content: string) {
  const res = await fetch(`${API_BASE}/analyze-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  return res.json();
}

export async function analyzePDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/analyze-document`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  return res.json();
}