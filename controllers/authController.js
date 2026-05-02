const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).send("Error registering user: " + err.message);
      }
      res.send("User registered ✅");
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).send("Server error");
    
    if (results.length === 0) return res.status(400).send("User not found ❌");

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password ❌");

    const token = jwt.sign({ id: user.id }, "secret123");
    res.json({ token });
  });
};