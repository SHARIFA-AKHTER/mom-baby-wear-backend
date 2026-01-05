

import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();
import cron from "node-cron";


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: [
      "http://localhost:3000", 
    "https://mom-baby-wear-frontend.vercel.app", 
    "https://mom-baby-wear-frontend-e1zjg8q2d-sharifa991s-projects.vercel.app" 
      ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
  })
);

cron.schedule("0 0 * * *", async () => {
  console.log("🕛 Running daily cron job at midnight");

 
  try {
    // Example: Clear expired coupons
    // await prisma.coupon.updateMany({
    //   where: { expiry: { lt: new Date() } },
    //   data: { isActive: false },
    // });
    console.log("✅ Daily cron job executed successfully");
  } catch (err) {
    console.error("❌ Cron job failed:", err);
  }
});

// routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Mom & Baby Wear Backend Running!",
  });
});

export default app;