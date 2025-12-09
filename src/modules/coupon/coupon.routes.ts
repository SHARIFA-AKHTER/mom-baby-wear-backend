import express from "express";

import { createCouponValidation, updateCouponValidation } from "./coupon.validation";
import { CouponController } from "./coupon.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";


const router = express.Router();

// ADMIN only
router.post(
  "/",
 authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  validateRequest(createCouponValidation),
  CouponController.createCoupon
);

// Public (optional)
router.get("/", CouponController.getAllCoupons);

router.get("/:id", CouponController.getSingleCoupon);

router.patch(
  "/:id",
   authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  validateRequest(updateCouponValidation),
  CouponController.updateCoupon
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  CouponController.deleteCoupon
);

export const couponRoutes = router;
