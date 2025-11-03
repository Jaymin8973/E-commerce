# Database Setup Guide

This guide will help you connect your React e-commerce dashboard to a MySQL database.

## Prerequisites

1. **MySQL Server** - Make sure MySQL is installed and running on your system
2. **Node.js** - Ensure Node.js is installed (version 16 or higher recommended)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database Connection

1. Copy the environment example file:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=ecommerce_db
   DB_PORT=3306
   PORT=5000
   NODE_ENV=development
   ```

### 3. Create Database and Tables

Run the SQL schema to create the database and tables:

```bash
# Option 1: Using the npm script (recommended)
npm run db:setup

# Option 2: Manual MySQL command
mysql -u root -p < database/schema.sql
```

### 4. Start the Application

You have several options to run the application:

#### Option A: Run both frontend and backend together
```bash
npm run dev:full
```

#### Option B: Run them separately
```bash
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the frontend
npm run dev
```

### 5. Verify the Setup

1. **Backend Server**: Visit `http://localhost:5000/api/health` - you should see a success message
2. **Frontend**: Visit `http://localhost:5173` - your React app should load
3. **Database**: Check that the tables are created and sample data is inserted

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - Get all orders
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

The database includes the following tables:

- **products** - Product information
- **orders** - Order details
- **customers** - Customer information
- **categories** - Product categories

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check your MySQL credentials in `.env`
   - Ensure MySQL server is running
   - Verify the database name exists

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill any process using port 5000: `npx kill-port 5000`

3. **CORS Issues**
   - The server is configured to allow CORS from the frontend
   - If you encounter CORS issues, check the frontend URL in server.js

### Testing Database Connection

You can test the database connection by visiting:
- `http://localhost:5000/api/health` - Basic health check
- `http://localhost:5000/api/products` - Get all products
- `http://localhost:5000/api/dashboard/stats` - Get dashboard statistics

## Next Steps

1. **Customize the API**: Modify `server.js` to add more endpoints
2. **Add Authentication**: Implement user authentication and authorization
3. **Add Validation**: Add input validation and error handling
4. **Deploy**: Deploy your application to a cloud platform

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify your MySQL server is running
3. Ensure all environment variables are correctly set
4. Check that all dependencies are installed
