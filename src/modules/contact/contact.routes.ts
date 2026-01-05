import express from 'express';
import { ContactController } from './contact.controller';
import { validateRequest } from '../../middleware/validateRequest'; 
import { ContactValidation } from './contact.validation';
import { authenticate, authorizeRoles } from '../../middleware/auth'; 

const router = express.Router();

router.post(
  '/send-message',
  validateRequest(ContactValidation.createContactMessageZodSchema),
  ContactController.createMessage
);

router.get(
  '/all-messages',
  authenticate, 
  authorizeRoles("ADMIN", "MANAGER", "STAFF"),
  ContactController.getAllMessages
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles("ADMIN"),
  ContactController.deleteMessage
);

export const ContactRoutes = router;