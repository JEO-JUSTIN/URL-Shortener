const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'jeo',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'url',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Utility function to encode ID to base64
function encode(text) {
  return Buffer.from(text).toString('base64');
}

// Utility function to decode from base64
function decode(text) {
  return Buffer.from(text, 'base64').toString('utf-8');
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Shorten URL
app.post('/api/shorten', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const connection = await pool.getConnection();
    
    // Insert URL into database
    const [result] = await connection.execute(
      'INSERT INTO urls (url) VALUES (?)',
      [url]
    );

    const id = result.insertId;
    const encoded = encode(String(id));

    connection.release();

    res.json({
      success: true,
      originalUrl: url,
      shortCode: encoded,
      shortUrl: `http://localhost:${PORT}/${encoded}`,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect to original URL
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const id = decode(code);

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT url FROM urls WHERE id = ?',
      [id]
    );

    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const redirectUrl = rows[0].url;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
