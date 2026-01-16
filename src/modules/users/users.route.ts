import express from "express";

import { createUserSchema } from "./users.validation";
import { usersController } from "./users.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authenticate} from "../../middleware/auth";
import { fileUploader } from "../../middleware/uploadImage";
import authorize from "../../middleware/authorize";

const router = express.Router();

// ADMIN only - create user manually
router.post(
  "/create",
  authenticate,
  authorize("ADMIN"),
  fileUploader.upload.single("image"),
  validateRequest(createUserSchema),
  usersController.createUser
); 

// ADMIN & MANAGER - get all users
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  usersController.getAllUsers
);

// Get single user - ADMIN or the user himself
router.get("/:id",
  //  authenticate,
   usersController.getSingleUser);

// ADMIN only - delete user
router.delete(
  "/:id",
  // authenticate,
  // authorize("ADMIN"),
  usersController.deleteUser
);

export const userRoutes = router;

