import { Router } from 'express';
import * as controller from './auth.controller';

import { registerSchema, loginSchema } from './auth.validation';
import { validateRequest } from '../../middleware/validateRequest';


const router = Router();
router.post('/register', validateRequest(registerSchema), controller.register);
router.post('/login', validateRequest(loginSchema), controller.login);


export default router;