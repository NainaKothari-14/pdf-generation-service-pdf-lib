const { createPDF } = require("../services/pdfService");

exports.generatePDF = async (req, res) => {
  try {
    const { title, content, logoBase64 } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "title and content are required" });
    }

    const pdfBytes = await createPDF({ title, content, logoBase64 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    return res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "PDF generation failed" });
  }
};
