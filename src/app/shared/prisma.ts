// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();



// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import dotenv from "dotenv";

// dotenv.config();

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Create a Postgres adapter using your DATABASE_URL
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!, // make sure it's defined in .env
//   // schema: "public", // optional if needed
// });

// // Singleton pattern to avoid multiple PrismaClients in dev
// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     adapter,
//     log: ["query", "info", "warn", "error"], 
//   });

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});