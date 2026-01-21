export default function Preview({ pdfUrl }) {
    return (
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>PDF Preview</h3>
  
        {!pdfUrl ? (
          <div style={{ color: "#666", fontSize: 14 }}>
            Click <b>Preview PDF</b> to render the actual PDF pages.
          </div>
        ) : (
          <iframe
            title="pdf-preview"
            src={pdfUrl}
            style={{ width: "100%", height: 650, border: "1px solid #ddd", borderRadius: 10 }}
          />
        )}
      </div>
    );
  }
  
  const card = {
    background: "#fff",
    border: "1px solid #e7e7e7",
    borderRadius: 12,
    padding: 18,
  };
  