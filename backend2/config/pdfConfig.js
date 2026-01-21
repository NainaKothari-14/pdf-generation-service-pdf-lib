const path = require("path");

module.exports = {
  page: { width: 595.28, height: 841.89 }, // A4
  margins: { top: 80, bottom: 70, left: 60, right: 60 },

  colors: {
    text: { r: 0.12, g: 0.12, b: 0.12 },
    muted: { r: 0.45, g: 0.45, b: 0.45 },
    border: { r: 0.86, g: 0.86, b: 0.86 },
    accent: { r: 0.10, g: 0.45, b: 0.95 },
  },

  theme: {
    titleSize: 20,
    heading1Size: 16,
    heading2Size: 14,
    bodySize: 11,
    lineHeight: 16,
    bulletIndent: 14,
  },

  defaultText: {
    title: "Untitled Document",
    content: "Write content here...",
  },

  assets: {
    // optional fonts (leave them if you don't use custom fonts)
    fontRegularPath: path.join(__dirname, "../assets/fonts/Inter-Regular.ttf"),
    fontBoldPath: path.join(__dirname, "../assets/fonts/Inter-Bold.ttf"),

    // watermark logo fallback (optional)
    defaultLogoPath: path.join(__dirname, "../assets/logo.png"),
  },
};
