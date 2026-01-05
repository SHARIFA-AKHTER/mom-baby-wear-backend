"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockLogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const stockLog_controller_1 = require("./stockLog.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const stockLog_validation_1 = require("./stockLog.validation");
const router = express_1.default.Router();
// create stock log
router.post("/create", (0, validateRequest_1.validateRequest)(stockLog_validation_1.createStockLogSchema), stockLog_controller_1.stockLogController.createStockLog);
// get all stock logs
router.get("/", stockLog_controller_1.stockLogController.getAllStockLogs);
exports.stockLogRoutes = router;
