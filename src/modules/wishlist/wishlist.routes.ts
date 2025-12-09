import express from "express";
import { WishlistController } from "./wishlist.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { addToWishlistValidation } from "./wishlist.validation";

const router = express.Router();

router.post(
  "/add",
  authenticate,
  authorizeRoles("CUSTOMER"),
  validateRequest(addToWishlistValidation),
  WishlistController.add
);

router.get("/", authenticate, WishlistController.get);

router.delete(
  "/remove/:productId",
  authenticate,
  authorizeRoles("CUSTOMER"),
  WishlistController.remove
);

export const WishlistRoutes = router;
