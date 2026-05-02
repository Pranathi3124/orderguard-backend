const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

app.use("/inventory", require("./routes/inventoryRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const connectMongo = require("./config/mongo");
connectMongo();

// Export the app for Vercel serverless deployment
module.exports = app;


