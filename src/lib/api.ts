// src/lib/api.ts

// src/lib/api.ts
export const API_BASE = "https://grik-ai.onrender.com";

// ---- TEXT ----
export async function analyzeText(content: string) {
  const res = await fetch(`${API_BASE}/analyze-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze text");
  }

  return res.json();
}

// ---- PDF ----
export async function analyzePDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/analyze-document`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to analyze PDF");
  }

  return res.json();
}
