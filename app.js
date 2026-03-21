const express = require("express");
require("dotenv").config();
require("./config/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OrderGuard API Running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/inventory", require("./routes/inventoryRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const connectMongo = require("./config/mongo");
connectMongo();


