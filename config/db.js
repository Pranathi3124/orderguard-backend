const { Pool } = require("pg");
require("dotenv").config();

let dbUrl = process.env.DATABASE_URL || "";
if (dbUrl.includes("?sslmode=require")) {
  dbUrl = dbUrl.replace("?sslmode=require", "");
}

// Use PostgreSQL for the Aiven database
const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create users table if it doesn't exist
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
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