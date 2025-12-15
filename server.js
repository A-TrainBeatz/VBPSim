const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (all JS, CSS, fonts, etc.)
app.use(express.static(__dirname));

// Fallback for root only
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`VBPSim running on port ${PORT}`);
});
