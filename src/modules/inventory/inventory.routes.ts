import express from "express";
import { InventoryController } from "./inventory.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { updateInventoryValidation } from "./inventory.validation";
import authorize from "../../middleware/authorize";

const router = express.Router();

// Admin/Manager only
router.patch(
  "/:productId",
  // authenticate,
  // authorize("ADMIN", "MANAGER"),
  validateRequest(updateInventoryValidation),
  InventoryController.updateStock
);

router.get(
  "/",
  // authenticate,
  // authorize("ADMIN", "MANAGER"),
  InventoryController.getInventory
);

router.get(
  "/:productId",
  // authenticate,
  // authorize("ADMIN", "MANAGER"),
  InventoryController.getProductInventory
);

export const InventoryRoutes = router;
