export async function generatePdfBlob({ title, content }) {
    const res = await fetch("http://localhost:5002/pdf/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
  
    if (!res.ok) {
      let msg = "PDF generation failed";
      try {
        const data = await res.json();
        msg = data.error || msg;
      } catch {}
      throw new Error(msg);
    }
  
    return await res.blob();
  }
  