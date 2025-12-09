import express from "express";
import { DashboardController } from "./dashboard.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";

const router = express.Router();

// Admin & Manager only
router.get("/stats", authenticate, authorizeRoles("ADMIN", "MANAGER"), DashboardController.getStats);
router.get("/monthly-sales", authenticate, authorizeRoles("ADMIN", "MANAGER"), DashboardController.getMonthlySales);
router.get("/low-stock", authenticate, authorizeRoles("ADMIN", "MANAGER"), DashboardController.getLowStock);

export const DashboardRoutes = router;
