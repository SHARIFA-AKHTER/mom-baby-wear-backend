import express from "express";

import { createProductSchema } from "./product.validation";

import { validateRequest } from "../../middleware/validateRequest";
import { productController } from "./products.controller";


const router = express.Router();


router.post("/create", validateRequest(createProductSchema), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);


export default router;