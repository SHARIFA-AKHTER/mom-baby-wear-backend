import express from 'express';

import { createReviewValidation } from './review.validation';
import { reviewController } from './review.controller';
import { authenticate, authorizeRoles } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

// User create review (only CUSTOMER)
router.post(
  '/',
  authenticate,
  authorizeRoles('CUSTOMER'),
  validateRequest(createReviewValidation),
  reviewController.createReview
);

// Get product reviews (public)
router.get(
  '/product/:productId',
  reviewController.getProductReviews
);

// Admin & Manager - get all reviews
router.get(
  '/',
  authenticate,
  authorizeRoles('ADMIN', 'MANAGER'),
  reviewController.getAllReviews
);

// Approve review (Admin/Manager only)
router.patch(
  '/approve/:id',
  authenticate,
  authorizeRoles('ADMIN', 'MANAGER'),
  reviewController.approveReview
);

// Delete review (Admin/Manager only)
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN', 'MANAGER'),
  reviewController.deleteReview
);

export const ReviewRoutes = router;
