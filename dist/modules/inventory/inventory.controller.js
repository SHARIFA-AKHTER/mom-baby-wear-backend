"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = require("../../utils/sendResponse");
const inventory_service_1 = require("./inventory.service");
const updateStock = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await inventory_service_1.InventoryService.updateStock(req.params.productId, req.body.quantity);
    res.json({ success: true, message: "Stock updated", data: result });
});
const getInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, ["productId", "supplierId"]);
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const dataWithMeta = await inventory_service_1.InventoryService.getInventory(filters, options);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Inventory data retrieved", dataWithMeta);
});
const getProductInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await inventory_service_1.InventoryService.getProductInventory(req.params.productId);
    res.json({ success: true, data: result });
});
exports.InventoryController = {
    updateStock,
    getInventory,
    getProductInventory
};
