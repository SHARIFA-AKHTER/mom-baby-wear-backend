import express from "express";

import { createProductSchema } from "./product.validation";

import { validateRequest } from "../../middleware/validateRequest";
import { productController } from "./product.controller";
import { authenticate } from "../../middleware/auth";
import authorize from "../../middleware/authorize";
import { Role } from "@prisma/client";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

router.post(
  "/create",
  authenticate,
  authorize(Role.ADMIN, Role.MANAGER),
  validateRequest(createProductSchema),
  productController.createProduct
);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.MANAGER),
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.MANAGER),
  productController.deleteProduct
);

export const productRoutes = router;
