📌 Project Overview

The Mom & Baby Wear Backend is developed using Node.js, Express.js, TypeScript, and Prisma ORM
with PostgreSQL.
It follows a modular, service-oriented architecture to ensure maintainability,
scalability, and zero-issue deployment on production platforms.

🚀 Key Features

Secure Authentication

Email & Password authentication

Google OAuth 2.0 integration

Token Management

JWT-based authentication

HTTP-Only cookies for secure session handling

Database & ORM

PostgreSQL (Neon DB)

Prisma ORM with migrations

Image Storage

Cloudinary integration for product images

Role-Based Access Control (RBAC)

Admin, Staff, Customer,Manager roles

Route-level permission enforcement

E-commerce Core

Products, categories, cart, orders

Inventory & stock logging

Payments

SSLCommerz

Stripe ready

Validation & Error Handling

Zod-based request validation

Centralized error handling system

🛠 Tech Stack

Runtime: Node.js (v18+)

Framework: Express.js with TypeScript

Database: PostgreSQL (Neon)

ORM: Prisma

Authentication: Google OAuth 2.0 & JWT

Image Storage: Cloudinary

Payments: SSLCommerz / Stripe

👥 User Roles & Permissions
Role	Permissions
Customer	Browse products, cart, checkout, reviews
Staff	Inventory management, order processing
Admin	Full access (users, products, orders, coupons, analytics)
🏗️ API Architecture

Modular architecture

Controller → Service → Database pattern

Centralized routing system

Shared utilities and middleware

🔁 Request Flow
Client
  → Route
    → Auth / Validation Middleware
      → Controller
        → Service
          → Prisma ORM
            → PostgreSQL Database

📁 Project Structure
backend/
├── src/
│   ├── app.ts        # App initialization (middlewares, CORS, COOP)
│   ├── server.ts     # Server entry point
│   ├── config/       # Environment & service configuration
│   ├── utils/        # ApiError, catchAsync, helpers
│   ├── middleware/   # Auth & request validation
│   ├── modules/      # Feature modules (auth, users, products, etc.)
│   ├── routes/       # Centralized API routing
│   └── database/     # Prisma client instance
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── .env

📦 Backend Modules (Feature Coverage)

Authentication & Authorization

User & Role Management

Product & Category Management

Cart & Order Management

Inventory & Stock Logs

Coupons & Discounts

Reviews & Ratings

Payments (SSLCommerz / Stripe)

Dashboard Analytics

AI-powered Features

Contact & Admin Settings

📄 Pagination & Filtering

Query-based pagination (page, limit)

Dynamic filtering using Prisma

Sorting by price, date, and relevance

🧪 Validation Strategy

Zod schemas for all request payloads

Centralized request validation middleware

Consistent validation error responses

❌ Error Handling Strategy

Custom ApiError class

Global error handler

Unified error response format for all APIs

🌐 Environment Variables

Create a .env file in the root directory:

PORT=5000
DATABASE_URL=your_neon_postgresql_url
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

FRONTEND_URL=https://mom-baby-wear-frontend.vercel.app

⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/SHARIFA-AKHTER/mom-baby-wear-backend.git
cd mom-baby-wear-backend


Install dependencies:

npm install


Database setup:

npx prisma generate
npx prisma migrate dev


Run the development server:

npm run dev


Production build:

npm run build
npm start

📡 API Endpoints Overview
Module	Base Path	Description
Auth	/auth	Login, register, Google OAuth
User	/user	User profiles & roles
Product	/product	Product CRUD
Category	/category	Category management
Cart	/cart	Shopping cart
Order	/order	Orders & tracking
Payments	/payments	SSLCommerz / Stripe
Dashboard	/dashboard	Analytics & stats
Inventory	/inventory	Stock management
Coupon	/coupon	Discount system
Review	/review	Ratings & reviews
Wishlist	/wishlist	Saved products
AI	/ai	Smart recommendations
Contact	/contact	Customer support
Admin Settings	/adminSettings	Site configuration
Stock Log	/stockLog	Stock history
Newsletter   /newsletter customer History
🔐 Security Implementation

JWT authentication with HTTP-Only cookies

Role-based authorization middleware

Secure CORS configuration with credentials

COOP enabled for Google OAuth popup support

SameSite=None & Secure cookie flags

☁️ Deployment Notes

Backend Hosting: Render

Database: Neon PostgreSQL

Frontend: Vercel

Environment variables securely managed

Prisma migrations deployed using prisma migrate deploy

🌍 Live Deployment

Backend API: https://mom-baby-wear-backend.vercel.app

Frontend: https://mom-baby-wear-frontend.vercel.app