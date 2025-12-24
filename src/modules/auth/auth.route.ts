import express from "express";
import { AuthController } from './auth.controller';
import { registerSchema, loginSchema } from './auth.validation';
import { validateRequest } from '../../middleware/validateRequest';


const router = express.Router();
router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login', validateRequest(loginSchema), AuthController.login);
// Refresh Token
router.post('/refresh-token', AuthController.refreshToken);


router.post('/change-password', 
    // authenticate,
     AuthController.changePassword);
router.get("/me", AuthController.getMe);


export const authRoutes = router