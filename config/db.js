const { Pool } = require("pg");
require("dotenv").config();

// Use PostgreSQL for the Aiven database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgres://user:password@host:port/defaultdb?sslmode=require
  ssl: {
    rejectUnauthorized: false // required for many cloud db providers
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