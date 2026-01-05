"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const inventory_service_1 = require("./inventory.service");
const updateStock = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await inventory_service_1.InventoryService.updateStock(req.params.productId, req.body.quantity);
    res.json({ success: true, message: "Stock updated", data: result });
});
const getInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await inventory_service_1.InventoryService.getInventory();
    res.json({ success: true, data: result });
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
