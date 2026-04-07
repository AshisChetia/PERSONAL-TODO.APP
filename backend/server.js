const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool } = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route - to verify server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo Master Backend is running! ✅',
    status: 'Server OK',
    database: 'TiDB Cloud Connected' 
  });
});

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
