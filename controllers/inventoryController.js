const connection = require("../config/db");

exports.getInventory = (req, res) => {
  connection.query("SELECT * FROM inventory", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching inventory");
    }
    res.json(results);
  });
};

exports.reduceInventory = (req, res) => {
  const { product_id, quantity } = req.body;

  const query = `
    UPDATE inventory 
    SET stock = stock - ? 
    WHERE product_id = ? AND stock >= ?
  `;

  connection.query(query, [quantity, product_id, quantity], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(400).send("Not enough stock ❌");
    }

    res.send("Stock updated successfully ✅");
  });
};

exports.addInventory = (req, res) => {
  const { product_id, stock } = req.body;

  const query = "INSERT INTO inventory (product_id, stock) VALUES (?, ?)";

  connection.query(query, [product_id, stock], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Inventory added ✅");
  });
};

exports.updateInventory = (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  const query = "UPDATE inventory SET stock = ? WHERE product_id = ?";

  connection.query(query, [stock, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Inventory updated ✅");
  });
};

exports.deleteInventory = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM inventory WHERE product_id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Inventory deleted ✅");
  });
};

exports.getInventoryById = (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM inventory WHERE product_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
};