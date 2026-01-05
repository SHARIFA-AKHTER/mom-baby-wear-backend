"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const dashboard_service_1 = require("./dashboard.service");
const getStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getStats();
    res.json({ success: true, data });
});
const getMonthlySales = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getMonthlySales();
    res.json({ success: true, data });
});
const getLowStock = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getLowStockProducts();
    res.json({ success: true, data });
});
exports.DashboardController = {
    getStats,
    getMonthlySales,
    getLowStock
};
