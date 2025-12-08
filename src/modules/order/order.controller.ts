import { Request, Response } from 'express';
import { orderService } from './order.service';


class OrderController {
createOrder = async (req: Request, res: Response) => {
const userId = req.user?.id!;


const result = await orderService.createOrder(userId, req.body);


res.status(201).json({
success: true,
message: 'Order created successfully',
data: result,
});
};


getAllOrders = async (_req: Request, res: Response) => {
const result = await orderService.getAllOrders();


res.json({
success: true,
message: 'Orders retrieved successfully',
data: result,
});
};


getSingleOrder = async (req: Request, res: Response) => {
const { id } = req.params;
const result = await orderService.getSingleOrder(id);


res.json({
success: true,
message: 'Order fetched successfully',
data: result,
});
};


updateOrderStatus = async (req: Request, res: Response) => {
const { id } = req.params;
const { status } = req.body;


const result = await orderService.updateOrderStatus(id, status);


res.json({
success: true,
message: 'Order status updated successfully',
data: result,
});
};


deleteOrder = async (req: Request, res: Response) => {
const { id } = req.params;
const result = await orderService.deleteOrder(id);


res.json({
success: true,
message: 'Order deleted successfully',
data: result,
});
};
}


export const orderController = new OrderController();