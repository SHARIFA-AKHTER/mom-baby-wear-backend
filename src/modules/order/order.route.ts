import express from 'express';
import { createOrderValidation } from './order.validation';
import { orderController } from './order.controller';

import { validateRequest } from '../../middleware/validateRequest';
import { authenticate} from '../../middleware/auth';
import authorize from '../../middleware/authorize';

const router = express.Router();

router.post(
  '/',
  authenticate,                
  authorize('CUSTOMER'),     
  validateRequest(createOrderValidation),
  orderController.createOrder
);


router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'MANAGER','STAFF'),
  orderController.getAllOrders
);


router.get(
  '/:id',
  // authenticate,
  // authorize('ADMIN', 'CUSTOMER','STAFF'),
  orderController.getSingleOrder
);


router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'MANAGER','STAFF'),
  orderController.updateOrderStatus
);


router.delete(
  '/:id',
  // authenticate,
  // authorize('ADMIN'),
  orderController.deleteOrder
);

export const OrderRoutes = router;
