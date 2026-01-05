"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const cart_validation_1 = require("./cart.validation");
const router = express_1.default.Router();
router.post("/add", auth_1.authenticate, (0, auth_1.authorizeRoles)("CUSTOMER"), (0, validateRequest_1.validateRequest)(cart_validation_1.addToCartValidation), cart_controller_1.CartController.addToCart);
router.get("/", auth_1.authenticate, cart_controller_1.CartController.getCart);
router.delete("/remove/:productId", auth_1.authenticate, (0, auth_1.authorizeRoles)("CUSTOMER"), cart_controller_1.CartController.removeItem);
router.delete("/clear", auth_1.authenticate, (0, auth_1.authorizeRoles)("CUSTOMER"), cart_controller_1.CartController.clearCart);
exports.CartRoutes = router;
