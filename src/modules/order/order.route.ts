import express from 'express';
import { createOrderValidation } from './order.validation';
import { orderController } from './order.controller';

import { validateRequest } from '../../middleware/validateRequest';
import { authenticate, authorizeRoles } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  authenticate,                
  authorizeRoles('CUSTOMER'),     
  validateRequest(createOrderValidation),
  orderController.createOrder
);


router.get(
  '/',
  // authenticate,
  // authorizeRoles('ADMIN', 'MANAGER'),
  orderController.getAllOrders
);


router.get(
  '/:id',
  // authenticate,
  // authorizeRoles('ADMIN', 'CUSTOMER'),
  orderController.getSingleOrder
);


router.patch(
  '/:id/status',
  // authenticate,
  // authorizeRoles('ADMIN', 'MANAGER'),
  orderController.updateOrderStatus
);


router.delete(
  '/:id',
  // authenticate,
  // authorizeRoles('ADMIN'),
  orderController.deleteOrder
);

export const OrderRoutes = router;
