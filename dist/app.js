"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const node_cron_1 = __importDefault(require("node-cron"));
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://mom-baby-wear-frontend.vercel.app",
        ];
        if (!origin ||
            allowedOrigins.includes(origin) ||
            origin.includes("vercel.app") ||
            origin.includes("sslcommerz.com")) {
            callback(null, true);
        }
        else {
            callback(new Error(`Not allowed by CORS from origin: ${origin}`));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("🕛 Running daily cron job at midnight");
    try {
        // Example: Clear expired coupons
        // await prisma.coupon.updateMany({
        //   where: { expiry: { lt: new Date() } },
        //   data: { isActive: false },
        // });
        console.log("✅ Daily cron job executed successfully");
    }
    catch (err) {
        console.error("❌ Cron job failed:", err);
    }
});
// routes
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Mom & Baby Wear Backend Running!",
    });
});
exports.default = app;
