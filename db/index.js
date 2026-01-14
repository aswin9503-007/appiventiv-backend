const { Pool } = require('pg');

// Only try to load dotenv if we are NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ ERROR: DATABASE_URL is not defined in Environment Variables!");
}

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};