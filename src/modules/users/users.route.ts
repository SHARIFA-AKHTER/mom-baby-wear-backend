import express from "express";

import { createUserSchema } from "./users.validation";
import { usersController } from "./users.controller";
import { validateRequest } from "../../middleware/validateRequest";



const router = express.Router();


router.post("/create", validateRequest(createUserSchema), usersController.createUser);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.delete("/:id", usersController.deleteUser);


export default router


