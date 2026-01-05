"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.validateRequest)(auth_validation_1.registerSchema), auth_controller_1.AuthController.register);
router.post('/login', (0, validateRequest_1.validateRequest)(auth_validation_1.loginSchema), auth_controller_1.AuthController.login);
// Refresh Token
router.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
router.post('/change-password', 
// authenticate,
auth_controller_1.AuthController.changePassword);
router.get("/me", auth_controller_1.AuthController.getMe);
router.post("/google", auth_controller_1.AuthController.googleLogin);
router.post('/logout', auth_controller_1.AuthController.logout);
exports.authRoutes = router;
