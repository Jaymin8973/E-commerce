
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    category VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    product_id INT,
    quantity INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO products (name, description, price, stock, category, image_url) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 50, 'Electronics', 'https://example.com/headphones.jpg'),
('Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 299.99, 30, 'Electronics', 'https://example.com/smartwatch.jpg'),
('Running Shoes', 'Comfortable running shoes for all terrains', 89.99, 100, 'Sports', 'https://example.com/shoes.jpg'),
('Laptop Backpack', 'Durable laptop backpack with multiple compartments', 49.99, 75, 'Accessories', 'https://example.com/backpack.jpg'),
('Coffee Maker', 'Automatic coffee maker with programmable timer', 129.99, 25, 'Home & Kitchen', 'https://example.com/coffeemaker.jpg');

INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Sports', 'Sports and fitness equipment'),
('Accessories', 'Fashion and lifestyle accessories'),
('Home & Kitchen', 'Home improvement and kitchen appliances');

INSERT INTO customers (name, email, phone, address) VALUES
('John Doe', 'john@example.com', '+1234567890', '123 Main St, City, State'),
('Jane Smith', 'jane@example.com', '+1234567891', '456 Oak Ave, City, State'),
('Bob Johnson', 'bob@example.com', '+1234567892', '789 Pine Rd, City, State');

INSERT INTO orders (customer_name, customer_email, product_id, quantity, total_amount, status, shipping_address) VALUES
('John Doe', 'john@example.com', 1, 2, 399.98, 'delivered', '123 Main St, City, State'),
('Jane Smith', 'jane@example.com', 2, 1, 299.99, 'shipped', '456 Oak Ave, City, State'),
('Bob Johnson', 'bob@example.com', 3, 3, 269.97, 'processing', '789 Pine Rd, City, State');
