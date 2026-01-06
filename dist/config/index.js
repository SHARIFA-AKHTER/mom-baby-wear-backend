"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    db_url: process.env.DATABASE_URL || "",
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: "7d",
        refresh_expires_in: "90d",
    },
    bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND) || 10,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    stripe_key: process.env.STRIPE_SECRET_KEY,
    ssl: {
        store_id: process.env.SSL_STORE_ID,
        store_pass: process.env.SSL_STORE_PASS,
        backend_url: process.env.BACKEND_URL,
    },
    frontend_url: process.env.FRONTEND_URL,
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
    },
};
