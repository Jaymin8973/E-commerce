const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to allow the cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection to connect the database
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// create connection pool
const pool = mysql.createPool(dbConfig);

// database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Getting products 
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Creating the new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, stock, category, image_url } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category, image_url]
    );
    res.json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Updating the product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image_url } = req.body;
    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, price, stock, category, image_url, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: { id, ...req.body } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete the product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Getting all orders
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT o.*, p.name as product_name 
      FROM orders o 
      LEFT JOIN products p ON o.product_id = p.id 
      ORDER BY o.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// fetching the dashboard statistics
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [totalProducts] = await pool.execute('SELECT COUNT(*) as count FROM products');
    const [totalOrders] = await pool.execute('SELECT COUNT(*) as count FROM orders');
    const [totalRevenue] = await pool.execute('SELECT SUM(total_amount) as total FROM orders WHERE status = "completed"');
    const [lowStockProducts] = await pool.execute('SELECT COUNT(*) as count FROM products WHERE stock < 10');

    res.json({
      success: true,
      data: {
        totalProducts: totalProducts[0].count,
        totalOrders: totalOrders[0].count,
        totalRevenue: totalRevenue[0].total || 0,
        lowStockProducts: lowStockProducts[0].count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

  // starting the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  testConnection();
});

module.exports = app;
