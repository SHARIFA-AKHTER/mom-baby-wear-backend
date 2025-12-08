import express from 'express';

import { createOrderValidation } from './order.validation';
import { orderController } from './order.controller';


const router = express.Router();


router.post(
'/',
auth('CUSTOMER'),
validateRequest(createOrderValidation),
orderController.createOrder
);


router.get('/', auth('ADMIN', 'MANAGER'), orderController.getAllOrders);
router.get('/:id', auth('ADMIN', 'CUSTOMER'), orderController.getSingleOrder);
router.patch('/:id/status', auth('ADMIN', 'MANAGER'), orderController.updateOrderStatus);
router.delete('/:id', auth('ADMIN'), orderController.deleteOrder);


export const OrderRoutes = router;