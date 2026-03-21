const connection = require("../config/db");
const Order = require("../models/order");
const { canTransition } = require("../services/ruleEngine");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  connection.beginTransaction(async (err) => {
    if (err) return res.status(500).send(err);

    try {
      // Reduce inventory
      for (let item of items) {
        const query = `
          UPDATE inventory 
          SET stock = stock - ? 
          WHERE product_id = ? AND stock >= ?
        `;

        const result = await new Promise((resolve, reject) => {
          connection.query(
            query,
            [item.quantity, item.productId, item.quantity],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });

        if (result.affectedRows === 0) {
          throw new Error("Not enough stock ❌");
        }
      }

      // Save order in MongoDB
      const order = new Order({ userId, items });
      await order.save();

      // ✅ Commit transaction
      connection.commit((err) => {
        if (err) {
          connection.rollback(() => {
            return res.status(500).send(err);
          });
        }

        res.json(order);
      });

    } catch (err) {
      // ❌ Rollback if anything fails
      connection.rollback(() => {
        res.status(400).send(err.message);
      });
    }
  });
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send("Order not found ❌");
    }

    if (!canTransition(order.status, newStatus)) {
      return res.status(400).send("Invalid status transition ❌");
    }

    order.status = newStatus;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).send(err);
  }
};