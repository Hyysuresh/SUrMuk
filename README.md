SurMuk eCom - Full Stack MERN eCommerce Application
A modern, full-featured eCommerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

Features
Frontend (React + Tailwind CSS)
• 🏠 Homepage with hero banner, product categories, and featured items
• 📦 Product Listing with sorting, filtering by category and price
• 🔍 Smart Search functionality
• 🛒 Shopping Cart with add/remove/update items
• ❤️ Wishlist to save favorite products
• ❤️ Wishlist to save favorite products
• 🎟️ Coupon System for discount codes
• 📱 Responsive Design - optimized for desktop, tablet, and mobile
• 🌙 Dark Theme with vibrant Indian color accents (red, yellow, green)
• 🔐 User Authentication with JWT
• 📦 Order Tracking and order history

Backend (Node.js + Express)

• RESTful APIs for products, users, orders, coupons, and payments
• JWT-based authentication with bcrypt password hashing
• File upload system for product images
• Admin routes protected by middleware
• Environment variables for database & payment keys

Database (MongoDB)

• Users - name, email, phone, password (hashed), role
• Products - title, description, category, price, images, rating
• Orders - user, products, status, payment info
• Coupons - code, discount%, expiry
• Wishlist - user, product IDs
• Reviews - product, user, rating, comment
• Payment Integration
• Razorpay payment gateway
• Multiple payment options: UPI, Cards, Net Banking
• Cash on Delivery (COD) support

Admin Panel

• Dashboard with sales stats and analytics
• Product management (Add/Edit/Delete)
• Order management with status updates
• Coupon management

Tech Stack

• Frontend: React.js + Vite + Tailwind CSS
• Backend: Node.js + Express.js
• Database: MongoDB
• Authentication: JWT + bcryptjs
• Payment: Razorpay

Setup Instructions

Prerequisites

• Node.js (v14 or higher)
• MongoDB

Installation

1. Install dependencies:
npm install
cd frontend && npm install

2. Set up environment variables:
Create a .env file in the root directory (this file is git-ignored for security):

# Database
MONGODB_URI=mongodb://localhost:27017/surmuk-ecom
# JWT Secret (required for authentication)
JWT_SECRET=your-secret-key-here
# Razorpay Payment Gateway (REQUIRED for online payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
# Server Port (optional, default: 5001)
PORT=5001
Important:

Never commit the .env file to version control
For Razorpay integration, get your API keys from https://dashboard.razorpay.com/
Use test keys for development and live keys for production
Start the application:
npm run dev
This will start:

Backend server on port 5001
Frontend dev server on port 5000
MongoDB on default port 27017
Access the application:
Frontend: http://localhost:5000
Backend API: http://localhost:5001
Default Admin Access
To create an admin user, register a new user and manually update the role in MongoDB:

db.users.updateOne(
  { email: "admin@surmuk.com" },
  { $set: { role: "admin" } }
)
Product Categories
Electronics
Accessories
Clothing
Home Decor
Health Care
Makeup
Others
API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile
Products
GET /api/products - Get all products (with filters)
GET /api/products/:id - Get single product
POST /api/products - Create product (Admin)
PUT /api/products/:id - Update product (Admin)
DELETE /api/products/:id - Delete product (Admin)
Orders
POST /api/orders - Create new order
POST /api/orders/verify - Verify Razorpay payment
GET /api/orders/user - Get user orders
GET /api/orders/all - Get all orders (Admin)
PUT /api/orders/:id/status - Update order status (Admin)
Coupons
POST /api/coupons/validate - Validate coupon
POST /api/coupons - Create coupon (Admin)
GET /api/coupons - Get all coupons (Admin)
DELETE /api/coupons/:id - Delete coupon (Admin)
Wishlist
GET /api/wishlist - Get user wishlist
POST /api/wishlist - Add to wishlist
DELETE /api/wishlist/:productId - Remove from wishlist
Color Scheme
Primary (Red): #DC2626
Secondary (Yellow): #FBBF24
Accent (Green): #10B981
Dark Background: #121212
Dark Light: #1E1E1E
Dark Lighter: #2A2A2A
License
ISC