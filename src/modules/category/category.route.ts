import { Router } from "express";

import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";
import { validateRequest } from "../../middleware/validateRequest";


const router = Router();


router.post("/", validateRequest(categoryValidation), CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);


export const CategoryRoutes = router;