const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // This allows the serverless function to connect securely to Neon
    rejectUnauthorized: false 
  }
});

// Use this for simple query execution
module.exports = {
  query: (text, params) => pool.query(text, params),
};