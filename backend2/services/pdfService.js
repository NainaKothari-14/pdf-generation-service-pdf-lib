const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const pdfConfig = require("../config/pdfConfig");
const helpers = require("../utils/helpers");

function toRGB(c) {
  return rgb(c.r, c.g, c.b);
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath);
  } catch {
    return null;
  }
}

// Accept either data:image/...;base64,xxxx OR raw base64
function decodeBase64Image(base64) {
  if (!base64) return null;
  const cleaned = base64.includes("base64,") ? base64.split("base64,")[1] : base64;
  try {
    return Buffer.from(cleaned, "base64");
  } catch {
    return null;
  }
}

// **bold** + *italic* segments (italic will just use regular unless you add italic font)
function splitSegments(line) {
  // returns [{t, style:"normal"|"bold"|"italic"}]
  const out = [];
  let i = 0;

  while (i < line.length) {
    // bold
    const bStart = line.indexOf("**", i);
    const iStart = line.indexOf("*", i);

    // choose closest marker
    let start = -1;
    let type = null;

    if (bStart !== -1 && (iStart === -1 || bStart <= iStart)) {
      start = bStart;
      type = "bold";
    } else if (iStart !== -1) {
      start = iStart;
      type = "italic";
    }

    if (start === -1) {
      out.push({ t: line.slice(i), style: "normal" });
      break;
    }

    if (start > i) out.push({ t: line.slice(i, start), style: "normal" });

    if (type === "bold") {
      const end = line.indexOf("**", start + 2);
      if (end === -1) {
        out.push({ t: line.slice(start), style: "normal" });
        break;
      }
      out.push({ t: line.slice(start + 2, end), style: "bold" });
      i = end + 2;
    } else {
      // italic: single *
      const end = line.indexOf("*", start + 1);
      if (end === -1) {
        out.push({ t: line.slice(start), style: "normal" });
        break;
      }
      out.push({ t: line.slice(start + 1, end), style: "italic" });
      i = end + 1;
    }
  }

  return out;
}

function drawHeaderFooter({ page, title, dateStr, pageNo, totalPages, fonts }) {
  const { left, right, top, bottom } = pdfConfig.margins;
  const w = page.getWidth();
  const h = page.getHeight();

  // header line
  page.drawLine({
    start: { x: left, y: h - top + 18 },
    end: { x: w - right, y: h - top + 18 },
    thickness: 1,
    color: toRGB(pdfConfig.colors.border),
  });

  page.drawText(title, {
    x: left,
    y: h - top + 28,
    size: 10,
    font: fonts.bold,
    color: toRGB(pdfConfig.colors.muted),
  });

  // footer line
  page.drawLine({
    start: { x: left, y: bottom - 18 },
    end: { x: w - right, y: bottom - 18 },
    thickness: 1,
    color: toRGB(pdfConfig.colors.border),
  });

  page.drawText(`Generated: ${dateStr}`, {
    x: left,
    y: bottom - 32,
    size: 9,
    font: fonts.regular,
    color: toRGB(pdfConfig.colors.muted),
  });

  const label = `Page ${pageNo} of ${totalPages}`;
  const labelW = fonts.regular.widthOfTextAtSize(label, 9);
  page.drawText(label, {
    x: w - right - labelW,
    y: bottom - 32,
    size: 9,
    font: fonts.regular,
    color: toRGB(pdfConfig.colors.muted),
  });
}

async function embedImage(pdfDoc, bytes) {
  if (!bytes) return null;
  try {
    return await pdfDoc.embedPng(bytes);
  } catch {
    try {
      return await pdfDoc.embedJpg(bytes);
    } catch {
      return null;
    }
  }
}

// BIG centered watermark
async function drawWatermark({ pdfDoc, page, logoBytes }) {
  const img = await embedImage(pdfDoc, logoBytes);
  if (!img) return;

  const w = page.getWidth();
  const h = page.getHeight();

  // 60% width watermark
  const targetW = w * 0.6;
  const dims = img.scale(1);
  const scale = targetW / dims.width;

  const drawW = dims.width * scale;
  const drawH = dims.height * scale;

  const x = (w - drawW) / 2;
  const y = (h - drawH) / 2;

  // Draw watermark
  page.drawImage(img, { x, y, width: drawW, height: drawH });

  // "opacity hack": overlay light rectangle, then later draw text on top
  page.drawRectangle({
    x: 0,
    y: 0,
    width: w,
    height: h,
    color: rgb(1, 1, 1),
    opacity: 0.70, // higher => more faint
  });
}

exports.createPDF = async ({ title, content, logoBase64 }) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // fonts
  const regBytes = safeRead(pdfConfig.assets.fontRegularPath);
  const boldBytes = safeRead(pdfConfig.assets.fontBoldPath);

  const fonts = {
    regular: regBytes ? await pdfDoc.embedFont(regBytes) : await pdfDoc.embedFont("Helvetica"),
    bold: boldBytes ? await pdfDoc.embedFont(boldBytes) : await pdfDoc.embedFont("Helvetica-Bold"),
  };

  const docTitle = (title || pdfConfig.defaultText.title).trim();
  const docContent = String(content || pdfConfig.defaultText.content);

  const dateStr = helpers.formatDate(new Date());
  const { left, right, top, bottom } = pdfConfig.margins;

  const pageW = pdfConfig.page.width;
  const pageH = pdfConfig.page.height;
  const maxWidth = pageW - left - right;

  // watermark bytes: request logo OR fallback
  const reqLogo = decodeBase64Image(logoBase64);
  const defaultLogo = safeRead(pdfConfig.assets.defaultLogoPath);
  const logoBytes = reqLogo || defaultLogo;

  const blocks = helpers.parseRichText(docContent);

  const pages = [];
  let page = pdfDoc.addPage([pageW, pageH]);
  pages.push(page);

  // watermark on every page later (when page created)
  await drawWatermark({ pdfDoc, page, logoBytes });

  // title (big)
  let y = pageH - top - 10;
  page.drawText(docTitle, {
    x: left,
    y,
    size: pdfConfig.theme.titleSize,
    font: fonts.bold,
    color: toRGB(pdfConfig.colors.text),
  });

  y -= 14;
  page.drawLine({
    start: { x: left, y },
    end: { x: left + Math.min(220, maxWidth), y },
    thickness: 2,
    color: toRGB(pdfConfig.colors.accent),
  });

  y -= 28;

  const footerSafeArea = bottom + 45;

  const newPage = async () => {
    page = pdfDoc.addPage([pageW, pageH]);
    pages.push(page);
    await drawWatermark({ pdfDoc, page, logoBytes });
    y = pageH - top - 10;
  };

  const ensureSpace = async (needed) => {
    if (y - needed < footerSafeArea) await newPage();
  };

  // render blocks
  for (const b of blocks) {
    if (b.type === "spacer") {
      await ensureSpace(12);
      y -= 12;
      continue;
    }

    if (b.type === "h1") {
      await ensureSpace(22);
      page.drawText(b.text, {
        x: left,
        y,
        size: pdfConfig.theme.heading1Size,
        font: fonts.bold,
        color: toRGB(pdfConfig.colors.text),
      });
      y -= 22;
      continue;
    }

    if (b.type === "h2") {
      await ensureSpace(20);
      page.drawText(b.text, {
        x: left,
        y,
        size: pdfConfig.theme.heading2Size,
        font: fonts.bold,
        color: toRGB(pdfConfig.colors.text),
      });
      y -= 20;
      continue;
    }

    if (b.type === "bullet") {
      const size = pdfConfig.theme.bodySize;
      const lines = helpers.wrapLine(b.text, fonts.regular, size, maxWidth - pdfConfig.theme.bulletIndent);

      let first = true;
      for (const line of lines) {
        await ensureSpace(pdfConfig.theme.lineHeight);

        if (first) {
          page.drawText("•", {
            x: left,
            y,
            size,
            font: fonts.bold,
            color: toRGB(pdfConfig.colors.text),
          });
          first = false;
        }

        // draw mixed segments (bold/italic)
        const segments = splitSegments(line);
        let x = left + pdfConfig.theme.bulletIndent;

        for (const seg of segments) {
          const f = seg.style === "bold" ? fonts.bold : fonts.regular;
          page.drawText(seg.t, { x, y, size, font: f, color: toRGB(pdfConfig.colors.text) });
          x += f.widthOfTextAtSize(seg.t, size);
        }

        y -= pdfConfig.theme.lineHeight;
      }
      continue;
    }

    // text block
    const size = pdfConfig.theme.bodySize;
    const lines = helpers.wrapLine(b.text, fonts.regular, size, maxWidth);

    for (const line of lines) {
      await ensureSpace(pdfConfig.theme.lineHeight);

      const segments = splitSegments(line);
      let x = left;

      for (const seg of segments) {
        const f = seg.style === "bold" ? fonts.bold : fonts.regular;
        page.drawText(seg.t, { x, y, size, font: f, color: toRGB(pdfConfig.colors.text) });
        x += f.widthOfTextAtSize(seg.t, size);
      }

      y -= pdfConfig.theme.lineHeight;
    }
  }

  // headers/footers
  const totalPages = pages.length;
  pages.forEach((p, idx) => {
    drawHeaderFooter({
      page: p,
      title: docTitle,
      dateStr,
      pageNo: idx + 1,
      totalPages,
      fonts,
    });
  });

  return pdfDoc.save();
};
