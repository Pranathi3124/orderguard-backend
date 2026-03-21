const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: Number,
      quantity: Number
    }
  ],
  status: {
    type: String,
    enum: ["PLACED", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PLACED"
  }
});

module.exports = mongoose.model("Order", orderSchema);