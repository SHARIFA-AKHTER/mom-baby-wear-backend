import express from 'express';
import { newsletterController } from './newsletter.controller';
import { newsletterValidation } from './newsletter.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate } from '../../middleware/auth';
import authorize from '../../middleware/authorize';

const router = express.Router();


router.post(
  '/subscribe',
  validateRequest(newsletterValidation),
  newsletterController.subscribe
);


router.get(
  '/subscribers',
//   authenticate,
//   authorize('ADMIN'),
  newsletterController.getAllSubscribers
);

export const NewsletterRoutes = router;