import express from "express";

import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authenticate, authorizeRoles } from "../../middleware/auth";

const router = express.Router();

// Create category - ADMIN & MANAGER
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  validateRequest(categoryValidation),
  CategoryController.createCategory
);

// Public routes
router.get("/", CategoryController.getAllCategory);
router.get("/:id", CategoryController.getOneCategory);

// Update category - ADMIN & MANAGER
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  CategoryController.updateCategory
);

// Delete category - ADMIN only
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  CategoryController.removeCategory
);

export const CategoryRoutes = router;
