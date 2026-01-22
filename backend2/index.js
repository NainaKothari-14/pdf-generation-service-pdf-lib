const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pdfRoutes = require("./routes/pdfRoutes"); // adjust path if needed

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/pdf", pdfRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`PDF service running on port ${PORT}`);
});
