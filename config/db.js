const mysql = require("mysql2");
require("dotenv").config();

// Use createPool instead of createConnection for serverless environments like Vercel
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create users table if it doesn't exist
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

pool.query(createUsersTable, (err, results) => {
  if (err) {
    console.error("❌ Error creating users table:", err);
  } else {
    console.log("✅ Users table ready or already exists!");
  }
});

module.exports = pool;