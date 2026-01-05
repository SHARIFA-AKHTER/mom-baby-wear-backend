"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const coupon_validation_1 = require("./coupon.validation");
const coupon_controller_1 = require("./coupon.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = express_1.default.Router();
// ADMIN only
router.post("/", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN", "MANAGER"), (0, validateRequest_1.validateRequest)(coupon_validation_1.createCouponValidation), coupon_controller_1.CouponController.createCoupon);
// Public (optional)
router.get("/", coupon_controller_1.CouponController.getAllCoupons);
router.get("/:id", coupon_controller_1.CouponController.getSingleCoupon);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN", "MANAGER"), (0, validateRequest_1.validateRequest)(coupon_validation_1.updateCouponValidation), coupon_controller_1.CouponController.updateCoupon);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN"), coupon_controller_1.CouponController.deleteCoupon);
exports.couponRoutes = router;
