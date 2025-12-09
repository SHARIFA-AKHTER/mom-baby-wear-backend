import express from "express";
import { CartController } from "./cart.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { addToCartValidation } from "./cart.validation";

const router = express.Router();

router.post(
  "/add",
  authenticate,
  authorizeRoles("CUSTOMER"),
  validateRequest(addToCartValidation),
  CartController.addToCart
);

router.get("/", authenticate, CartController.getCart);

router.delete(
  "/remove/:productId",
  authenticate,
  authorizeRoles("CUSTOMER"),
  CartController.removeItem
);

router.delete(
  "/clear",
  authenticate,
  authorizeRoles("CUSTOMER"),
  CartController.clearCart
);

export const CartRoutes = router;
