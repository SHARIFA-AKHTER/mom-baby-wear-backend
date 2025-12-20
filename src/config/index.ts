import dotenv from "dotenv";
import ms from "ms";
dotenv.config();

interface JwtConfig {
  secret: string;
  refresh_secret: string;
  expires_in: ms.StringValue;
  refresh_expires_in: ms.StringValue;
}

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.DATABASE_URL || "",

  jwt: {
    secret: process.env.JWT_SECRET as string,
    refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    expires_in: "7d" as ms.StringValue,
    refresh_expires_in: "90d" as ms.StringValue,
  },

  bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND) || 10,

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  },

  stripe_key: process.env.STRIPE_SECRET_KEY as string,

  ssl: {
    store_id: process.env.SSL_STORE_ID as string,
    store_pass: process.env.SSL_STORE_PASS as string,
    backend_url: process.env.BACKEND_URL as string,
  },
};