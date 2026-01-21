const express = require("express");
const router = express.Router();
const { generatePDF } = require("../controllers/pdfController");

router.post("/generate", generatePDF);

module.exports = router;
