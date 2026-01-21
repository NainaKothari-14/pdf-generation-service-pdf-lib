require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

app.use("/pdf", pdfRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`PDF Service running on port ${PORT}`));
