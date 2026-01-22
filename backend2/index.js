const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*", // we’ll tighten this later
}));

app.use(express.json({ limit: "1mb" }));

// routes
app.use("/pdf", require("./routes/pdfRoutes"));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
