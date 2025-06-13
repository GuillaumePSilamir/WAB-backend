const { Pool } = require('pg');
require('dotenv').config(); // si ce n’est pas déjà fait

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;