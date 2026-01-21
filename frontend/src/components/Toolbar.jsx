export default function Toolbar({ content, setContent }) {
    const wrapSelection = (before, after = before) => {
      const ta = document.getElementById("contentBox");
      if (!ta) return;
  
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
  
      const selected = content.slice(start, end);
      const next = content.slice(0, start) + before + selected + after + content.slice(end);
  
      setContent(next);
  
      setTimeout(() => {
        ta.focus();
        ta.selectionStart = start + before.length;
        ta.selectionEnd = end + before.length;
      }, 0);
    };
  
    const prefixLine = (prefix) => {
      const ta = document.getElementById("contentBox");
      if (!ta) return;
  
      const start = ta.selectionStart;
      const lineStart = content.lastIndexOf("\n", start - 1) + 1;
  
      const next = content.slice(0, lineStart) + prefix + content.slice(lineStart);
      setContent(next);
  
      setTimeout(() => {
        ta.focus();
        ta.selectionStart = start + prefix.length;
        ta.selectionEnd = start + prefix.length;
      }, 0);
    };
  
    const btn = {
      padding: "8px 10px",
      borderRadius: 10,
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
    };
  
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <button type="button" style={btn} onClick={() => wrapSelection("**", "**")}>B</button>
        <button type="button" style={btn} onClick={() => wrapSelection("*", "*")}>I</button>
        <button type="button" style={btn} onClick={() => prefixLine("# ")}>H1</button>
        <button type="button" style={btn} onClick={() => prefixLine("## ")}>H2</button>
        <button type="button" style={btn} onClick={() => prefixLine("- ")}>•</button>
      </div>
    );
  }
  