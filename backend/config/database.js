const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool for TiDB
const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT || 4000,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to TiDB Cloud');
    connection.release();
  })
  .catch(error => {
    console.error('❌ TiDB connection error:', error.message);
  });

module.exports = {
  pool
};
