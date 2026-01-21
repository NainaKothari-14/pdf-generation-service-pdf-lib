export default function PdfForm({
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    onGenerate,
    onPreview,
  }) {
    return (
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Inputs</h3>
  
        <div style={{ marginBottom: 14 }}>
          <label style={label}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            style={input}
          />
        </div>
  
        <div style={{ marginBottom: 14 }}>
          <label style={label}>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content..."
            rows={10}
            style={textarea}
          />
          <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
            Tip: Use <b># Heading</b>, bullets <b>- item</b>, and <b>**bold**</b> if your backend supports it.
          </div>
        </div>
  
        {error ? <div style={errBox}>{error}</div> : null}
  
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            onClick={onPreview}
            disabled={loading}
            style={{
              ...btn,
              background: "#fff",
              color: "#111",
              border: "1px solid #ddd",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Rendering..." : "Preview PDF"}
          </button>
  
          <button
            onClick={onGenerate}
            disabled={loading}
            style={{
              ...btn,
              background: "#111",
              color: "#fff",
              border: "1px solid #111",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>
    );
  }
  
  /* styles */
  const card = {
    background: "#fff",
    border: "1px solid #e7e7e7",
    borderRadius: 12,
    padding: 18,
  };
  
  const label = {
    display: "block",
    fontWeight: 600,
    fontSize: 13,
    marginBottom: 6,
    color: "#222",
  };
  
  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
  };
  
  const textarea = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
    fontFamily: "inherit",
    resize: "vertical",
  };
  
  const btn = {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
  };
  
  const errBox = {
    marginTop: 10,
    padding: "10px 12px",
    borderRadius: 10,
    background: "#ffe8ea",
    color: "#b00020",
    border: "1px solid #ffccd2",
    fontSize: 13,
  };
  