"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockLogController = void 0;
const stockLog_service_1 = require("./stockLog.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const createStockLog = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await stockLog_service_1.stockLogService.createStockLog(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "StockLog created successfully", result);
});
const getAllStockLogs = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await stockLog_service_1.stockLogService.getAllStockLogs();
    (0, sendResponse_1.sendResponse)(res, 200, true, "StockLogs fetched successfully", result);
});
exports.stockLogController = {
    createStockLog,
    getAllStockLogs,
};
