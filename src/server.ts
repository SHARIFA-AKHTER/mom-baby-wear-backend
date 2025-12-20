import dotenv from "dotenv";
dotenv.config();

// import app from "./app";
// import { prisma } from "./app/shared/prisma";
// import config from "./config";

// async function startServer() {
//   try {
//     // Connect to database
//     await prisma.$connect();
//     console.log("🎉 Database connected successfully");

//     // Start Express server
//     app.listen(config.port, () => {
//       console.log(`🚀 Server running on port ${config.port}`);
//     });

//     // Graceful shutdown
//     process.on("SIGINT", async () => {
//       console.log("\n🛑 SIGINT received, closing server...");
//       await prisma.$disconnect();
//       process.exit(0);
//     });

//     process.on("SIGTERM", async () => {
//       console.log("\n🛑 SIGTERM received, closing server...");
//       await prisma.$disconnect();
//       process.exit(0);
//     });
//   } catch (err) {
//     console.error("❌ Database connection failed:", err);
//     process.exit(1); // Exit process if DB connection fails
//   }
// }

// startServer();

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
