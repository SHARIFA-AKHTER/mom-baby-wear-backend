
import app from "./app";
import config from "./config";


// const prisma = new PrismaClient();

async function startServer() {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

    // await prisma.$connect();
    console.log("🎉 Database connected successfully");
  } catch (err) {
    console.log("❌ Database connection failed:", err);
  }
}

startServer();
