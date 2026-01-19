"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const dashboard_service_1 = require("./dashboard.service");
const sendResponse_1 = require("../../utils/sendResponse");
const getStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getStats();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Dashboard stats retrieved", data);
});
const getMonthlySales = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getMonthlySales();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Monthly sales retrieved", data);
});
const getLowStock = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getLowStockProducts();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Low stock products retrieved", data);
});
const getRecentOrders = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await dashboard_service_1.DashboardService.getRecentOrders();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Recent orders fetched", data);
});
exports.DashboardController = {
    getStats,
    getMonthlySales,
    getLowStock,
    getRecentOrders
};
