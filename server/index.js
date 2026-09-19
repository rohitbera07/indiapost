const express = require("express");
const cors = require("cors");
require("dotenv").config();

const trackingRoutes = require("./routes/trackingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tracking", trackingRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "India Post Tracking API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});