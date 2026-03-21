const express = require("express");
const router = express.Router();

const { createOrder, updateOrderStatus } = require("../controllers/orderController");

// Create order
router.post("/", createOrder);

// Update order status
router.post("/status", updateOrderStatus);

module.exports = router;