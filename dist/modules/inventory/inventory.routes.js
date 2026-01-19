"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = require("./inventory.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const inventory_validation_1 = require("./inventory.validation");
const router = express_1.default.Router();
// Admin/Manager only
router.patch("/:productId", 
// authenticate,
// authorize("ADMIN", "MANAGER"),
(0, validateRequest_1.validateRequest)(inventory_validation_1.updateInventoryValidation), inventory_controller_1.InventoryController.updateStock);
router.get("/", 
// authenticate,
// authorize("ADMIN", "MANAGER"),
inventory_controller_1.InventoryController.getInventory);
router.get("/:productId", 
// authenticate,
// authorize("ADMIN", "MANAGER"),
inventory_controller_1.InventoryController.getProductInventory);
exports.InventoryRoutes = router;
