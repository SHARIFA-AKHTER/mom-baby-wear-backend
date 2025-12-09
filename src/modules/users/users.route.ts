import express from "express";

import { createUserSchema } from "./users.validation";
import { usersController } from "./users.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authenticate, authorizeRoles } from "../../middleware/auth";

const router = express.Router();

// ADMIN only - create user manually
router.post(
  "/create",
  authenticate,
  authorizeRoles("ADMIN"),
  validateRequest(createUserSchema),
  usersController.createUser
);

// ADMIN & MANAGER - get all users
router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  usersController.getAllUsers
);

// Get single user - ADMIN or the user himself
router.get("/:id", authenticate, usersController.getSingleUser);

// ADMIN only - delete user
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  usersController.deleteUser
);

export const userRoutes = router;

