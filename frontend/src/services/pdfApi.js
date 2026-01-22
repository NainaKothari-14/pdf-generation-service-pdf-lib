const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

export async function generatePdfBlob({ title, content }) {
  const res = await fetch(`${API_URL}/pdf/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    let msg = "PDF generation failed";
    try {
      const data = await res.json();
      msg = data.error || msg;
    } catch {
      // sometimes server returns text/html on error
      const t = await res.text().catch(() => "");
      if (t) msg = t;
    }
    throw new Error(msg);
  }

  const blob = await res.blob();

  // safety check
  if (blob.type !== "application/pdf") {
    throw new Error("Server did not return a PDF.");
  }

  return blob;
}
