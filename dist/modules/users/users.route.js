"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_validation_1 = require("./users.validation");
const users_controller_1 = require("./users.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const uploadImage_1 = require("../../middleware/uploadImage");
const router = express_1.default.Router();
// ADMIN only - create user manually
router.post("/create", 
// authenticate,
// authorize("ADMIN"),
uploadImage_1.fileUploader.upload.single("image"), (0, validateRequest_1.validateRequest)(users_validation_1.createUserSchema), users_controller_1.usersController.createUser);
// ADMIN & MANAGER - get all users
router.get("/", 
// authenticate,
// authorize("ADMIN", "MANAGER"),
users_controller_1.usersController.getAllUsers);
// Get single user - ADMIN or the user himself
router.get("/:id", 
//  authenticate,
users_controller_1.usersController.getSingleUser);
// ADMIN only - delete user
router.delete("/:id", 
// authenticate,
// authorize("ADMIN"),
users_controller_1.usersController.deleteUser);
exports.userRoutes = router;
