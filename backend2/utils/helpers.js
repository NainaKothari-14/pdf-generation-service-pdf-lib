exports.formatDate = (d) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  
  /**
   * Markdown-lite parsing:
   * # Heading -> h1
   * ## Heading -> h2
   * - bullet -> bullet
   * blank line -> spacer
   * everything else -> text
   */
  exports.parseRichText = (text) => {
    const lines = String(text || "").split("\n");
    const blocks = [];
  
    for (const raw of lines) {
      const line = raw.trimEnd();
  
      if (!line.trim()) {
        blocks.push({ type: "spacer" });
        continue;
      }
  
      if (line.startsWith("## ")) {
        blocks.push({ type: "h2", text: line.slice(3).trim() });
        continue;
      }
  
      if (line.startsWith("# ")) {
        blocks.push({ type: "h1", text: line.slice(2).trim() });
        continue;
      }
  
      if (line.startsWith("- ")) {
        blocks.push({ type: "bullet", text: line.slice(2).trim() });
        continue;
      }
  
      blocks.push({ type: "text", text: line });
    }
  
    return blocks;
  };
  
  exports.wrapLine = (text, font, fontSize, maxWidth) => {
    const words = String(text).split(" ");
    const lines = [];
    let current = "";
  
    for (const w of words) {
      const test = current ? `${current} ${w}` : w;
      const width = font.widthOfTextAtSize(test, fontSize);
  
      if (width <= maxWidth) current = test;
      else {
        if (current) lines.push(current);
        current = w;
      }
    }
    if (current) lines.push(current);
  
    return lines;
  };
  