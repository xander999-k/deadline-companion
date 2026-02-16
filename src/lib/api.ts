const API_BASE = "http://127.0.0.1:8000";

export async function analyzeText(content: string) {
  const res = await fetch(`${API_BASE}/analyze-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to analyze text");
  return res.json();
}

export async function analyzePDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/analyze-document`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to analyze PDF");
  return res.json();
}
