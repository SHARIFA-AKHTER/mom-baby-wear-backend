import dotenv from "dotenv";
dotenv.config();


import app from "./app";
import config from "./config";
import { prisma } from "./app/shared/prisma";

async function startServer() {
  try {
    await prisma.$connect(); // Explicit connection
    console.log("🎉 Database connected successfully");

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

startServer();
