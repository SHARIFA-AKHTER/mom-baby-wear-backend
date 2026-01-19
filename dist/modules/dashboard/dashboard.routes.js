"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("./dashboard.controller");
const auth_1 = require("../../middleware/auth");
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const router = express_1.default.Router();
// Admin & Manager only
router.get("/stats", auth_1.authenticate, (0, authorize_1.default)("ADMIN", "MANAGER"), dashboard_controller_1.DashboardController.getStats);
router.get("/monthly-sales", auth_1.authenticate, (0, authorize_1.default)("ADMIN", "MANAGER"), dashboard_controller_1.DashboardController.getMonthlySales);
router.get("/low-stock", auth_1.authenticate, (0, authorize_1.default)("ADMIN", "MANAGER"), dashboard_controller_1.DashboardController.getLowStock);
router.get("/recent-orders", auth_1.authenticate, (0, authorize_1.default)("ADMIN", "MANAGER"), dashboard_controller_1.DashboardController.getRecentOrders);
exports.DashboardRoutes = router;
