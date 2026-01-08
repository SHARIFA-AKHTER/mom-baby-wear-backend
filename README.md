Mom & Baby Wear Backend 👶👗
This is the robust backend API for the Mom & Baby Wear e-commerce platform
. Built with Node.js, Express, and Prisma ORM, it provides a secure and
scalable foundation for managing
products, categories, orders, and professional authentication.

🚀 Key Features
Secure Auth: Implements both Email/Password login and Google OAuth 2.0 integration.

Token Management: Uses JWT (JSON Web Tokens) with HTTP-Only cookies for secure session handling.

ORM: Powered by Prisma with PostgreSQL (hosted on Neon) for efficient data modeling.

Storage: Integrated with Cloudinary for high-performance product image hosting.

Role-Based Access Control (RBAC): Distinct permissions for ADMIN and CUSTOMER roles.

Payment Gateway: Ready for Stripe and SSLCommerz payment processing.

Validation: Robust data validation using Zod and centralized error management.

🛠 Tech Stack
Runtime: Node.js (v18+)

Framework: Express.js with TypeScript

Database: PostgreSQL (Neon DB)

ORM: Prisma

Authentication: Google OAuth 2.0 & JWT

Image Storage: Cloudinary

Payment: SSLCommerz

📁 Project Structure
backend/
├── src/
│ ├── app.ts # App initialization (Middlewares, CORS, COOP)
│ ├── server.ts # Server entry point
│ ├── config/ # Environment variables & configurations
│ ├── utils/ # Shared utilities (ApiError, catchAsync)
│ ├── middleware/ # Auth & Request validation logic
│ ├── modules/ # Domain-driven feature modules (Auth, Products, etc.)
│ ├── routes/ # Centralized API routing
│ └── database/ # Prisma client instance
├── prisma/ # Database schema and migrations
└── .env # Environment configuration

🌐 Environment Variables
To run this project, you will need to add the following variables to your .env file:

PORT=5000
DATABASE_URL="your_neon_postgresql_url"
JWT_SECRET="your_jwt_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
FRONTEND_URL="https://mom-baby-wear-frontend.vercel.app"

⚙️ Installation & Setup
Clone the Repository

git clone https://github.com/SHARIFA-AKHTER/mom-baby-wear-backend.git

cd mom-baby-wear-backend
Install Dependencies:

npm install

Database Migration:
npx prisma generate
npx prisma migrate dev

Run the Server:
npm run dev

📡 API Endpoints

Module, Base Path, Description
Auth  /auth  "Handles User Registration, Login, and Google OAuth."
User   /user  Manage user profiles and roles.
Product  /product  "Product listing, details, and management."
Category   /category   Category-wise product organization.
Cart   /cart   Shopping cart management for customers.
Order   /order    Order placement and tracking.
Payments    /payments  Handles Stripe and SSLCommerz payment flows.
Dashboard   /dashboard  Analytics and statistics for Admin/Staff.
Inventory  /inventory  Manage product stock and availability.
Coupon    /coupon  Discount and promotional coupon management.
Review   /review   Product ratings and user feedback.
Wishlist   /wishlist  Manage users' saved/favorite products.
AI  /ai  "AI-powered features (e.g., smart recommendations)."
Contact  /contact   Customer support and contact form inquiries.
Admin Settings   /adminSettings   General site-wide configurations for admins.
Stock Log   /stockLog   Tracking history of stock changes and updates.

🛡️ Security Implementation
The API is configured with specific headers to handle cross-origin authentication
on platforms like Vercel:

CORS: Enabled with credentials: true for secure cookie exchange.

COOP: Configured for Google Login popup compatibility (same-origin-allow-popups).

SameSite Cookies: Tokens are set with SameSite=None and Secure flags for cross-domain support.
