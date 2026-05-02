const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/orderguard";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
};

module.exports = connectMongo;