import express from "express";
import { InventoryController } from "./inventory.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { updateInventoryValidation } from "./inventory.validation";

const router = express.Router();

// Admin/Manager only
router.patch(
  "/:productId",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  validateRequest(updateInventoryValidation),
  InventoryController.updateStock
);

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  InventoryController.getInventory
);

router.get(
  "/:productId",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  InventoryController.getProductInventory
);

export const InventoryRoutes = router;
