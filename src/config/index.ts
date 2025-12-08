import dotenv from "dotenv";
import ms from "ms";
dotenv.config();

// export default {
//   port: process.env.PORT,
//   db_url: process.env.DATABASE_URL,
//   jwt_secret: process.env.jwt_secret!,
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   cloud_api_key: process.env.CLOUDINARY_API_KEY,
//   cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
//   stripe_key: process.env.STRIPE_SECRET_KEY,
// };
interface JwtConfig {
  secret: string;
  refresh_secret: string;
  expires_in: ms.StringValue;
  refresh_expires_in: ms.StringValue;
}
export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,

  jwt: {
    secret: process.env.jwt_secret as string,
    refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    expires_in: "7d" as ms.StringValue,
    refresh_expires_in: "90d",
  },

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_api_secret: process.env.CLOUDINARY_API_SECRET,

  stripe_key: process.env.STRIPE_SECRET_KEY,
};