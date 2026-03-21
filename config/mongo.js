const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/orderguard");
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
};

module.exports = connectMongo;