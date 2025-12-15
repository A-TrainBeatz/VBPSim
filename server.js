const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files FIRST
app.use(express.static(__dirname));

// Only fallback for unknown routes (not files)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`VBPSim running on port ${PORT}`);
});
