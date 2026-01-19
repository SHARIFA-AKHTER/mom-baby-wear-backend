"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_1 = require("../../middleware/auth");
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const router = express_1.default.Router();
router.post('/', auth_1.authenticate, (0, authorize_1.default)('CUSTOMER'), (0, validateRequest_1.validateRequest)(order_validation_1.createOrderValidation), order_controller_1.orderController.createOrder);
router.get('/', auth_1.authenticate, (0, authorize_1.default)('ADMIN', 'MANAGER', 'STAFF'), order_controller_1.orderController.getAllOrders);
router.get('/:id', 
// authenticate,
// authorize('ADMIN', 'CUSTOMER','STAFF'),
order_controller_1.orderController.getSingleOrder);
router.patch('/:id/status', auth_1.authenticate, (0, authorize_1.default)('ADMIN', 'MANAGER', 'STAFF'), order_controller_1.orderController.updateOrderStatus);
router.delete('/:id', 
// authenticate,
// authorize('ADMIN'),
order_controller_1.orderController.deleteOrder);
exports.OrderRoutes = router;
