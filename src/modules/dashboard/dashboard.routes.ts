import express from "express";
import { DashboardController } from "./dashboard.controller";
import { authenticate} from "../../middleware/auth";
import authorize from "../../middleware/authorize";

const router = express.Router();

// Admin & Manager only
router.get("/stats", authenticate, authorize("ADMIN", "MANAGER"), DashboardController.getStats);
router.get("/monthly-sales", authenticate, authorize("ADMIN", "MANAGER"), DashboardController.getMonthlySales);
router.get("/low-stock", authenticate, authorize("ADMIN", "MANAGER"), DashboardController.getLowStock);
router.get("/recent-orders", authenticate, authorize("ADMIN", "MANAGER"), DashboardController.getRecentOrders);

export const DashboardRoutes = router;
