import { Router } from "express";

import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post("/", validateRequest(categoryValidation), CategoryController.createCategory );
router.get("/", CategoryController.getAllCategory );
router.get("/:id", CategoryController.getOneCategory );
router.patch("/:id", CategoryController.updateCategory );
router.delete("/:id", CategoryController.removeCategory );


export const CategoryRoutes = router;