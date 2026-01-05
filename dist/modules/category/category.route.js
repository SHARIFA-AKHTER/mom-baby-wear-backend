"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
// Create category - ADMIN & MANAGER
router.post("/", 
// authenticate,
// authorizeRoles("ADMIN", "MANAGER"),
(0, validateRequest_1.validateRequest)(category_validation_1.categoryValidation), category_controller_1.CategoryController.createCategory);
// Public routes
router.get("/", category_controller_1.CategoryController.getAllCategory);
router.get("/:id", category_controller_1.CategoryController.getOneCategory);
// Update category - ADMIN & MANAGER
router.patch("/:id", 
// authenticate,
// authorizeRoles("ADMIN", "MANAGER"),
category_controller_1.CategoryController.updateCategory);
// Delete category - ADMIN only
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN"), category_controller_1.CategoryController.removeCategory);
exports.CategoryRoutes = router;
