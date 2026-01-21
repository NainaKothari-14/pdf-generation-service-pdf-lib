import { useEffect, useState } from "react";
import PdfForm from "./components/PdfForm";
import Preview from "./components/Preview";
import { generatePdfBlob } from "./services/pdfApi";

export default function App() {
  const [title, setTitle] = useState("My Document");
  const [content, setContent] = useState(`# Heading
Write enough text to go to page 2...

- Bullet 1
- Bullet 2

**Bold text** and *italic text*
`);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // cleanup blob url
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const validate = () => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!content.trim()) {
      setError("Content is required");
      return false;
    }
    return true;
  };

  const buildPreview = async () => {
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const blob = await generatePdfBlob({ title, content });
      const url = URL.createObjectURL(blob);

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(url);
    } catch (e) {
      setError(e.message || "Failed to preview PDF");
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const blob = await generatePdfBlob({ title, content });
      const url = URL.createObjectURL(blob);

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      setError(e.message || "Failed to download PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb", padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ margin: 0 }}>PDF Generator (pdf-lib)</h1>
        <p style={{ marginTop: 6, color: "#666" }}>
          Preview shows the real PDF pages (Page 1 / Page 2 / ...).
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
          <PdfForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            loading={loading}
            error={error}
            onPreview={buildPreview}
            onGenerate={downloadPdf}
          />

          <Preview pdfUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
}
