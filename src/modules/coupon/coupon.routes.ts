import express from "express";

import { createCouponValidation, updateCouponValidation } from "./coupon.validation";
import { CouponController } from "./coupon.controller";
import { authenticate } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import authorize from "../../middleware/authorize";


const router = express.Router();

// ADMIN only
router.post(
  "/",
 authenticate,
  authorize("ADMIN", "MANAGER"),
  validateRequest(createCouponValidation),
  CouponController.createCoupon
);

// Public (optional)
router.get("/", CouponController.getAllCoupons);

router.get("/:id", CouponController.getSingleCoupon);

router.patch(
  "/:id",
   authenticate,
  authorize("ADMIN", "MANAGER"),
  validateRequest(updateCouponValidation),
  CouponController.updateCoupon
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  CouponController.deleteCoupon
);

export const couponRoutes = router;
