import { Request, Response } from 'express';
import { orderService } from './order.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';


// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ success: false, message: "Unauthorized" });

//     const token = authHeader.split(" ")[1];
//     const payload: any = jwt.verify(token, config.jwt.secret);

   
//     const userId = payload.id;

//     const result = await orderService.createOrder(userId, req.body);
//     return res.status(201).json({ success: true, message: "Order created", data: result });
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

const createOrder = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, false, 'Unauthorized', null);
  }

  const userId = req.user.id;
  const result = await orderService.createOrder(userId, req.body);

  sendResponse(res, 201, true, 'Order created successfully', result);
});


const getAllOrders = async (_req: Request, res: Response) => {
const result = await orderService.getAllOrders();


res.json({
success: true,
message: 'Orders retrieved successfully',
data: result,
});
};

const getSingleOrder = async (req: Request, res: Response) => {
const { id } = req.params;
const result = await orderService.getSingleOrder(id);


res.json({
success: true,
message: 'Order fetched successfully',
data: result,
});
};


const updateOrderStatus = async (req: Request, res: Response) => {
const { id } = req.params;
const { status } = req.body;


const result = await orderService.updateOrderStatus(id, status);


res.json({
success: true,
message: 'Order status updated successfully',
data: result,
});
};


const deleteOrder = async (req: Request, res: Response) => {
const { id } = req.params;
const result = await orderService.deleteOrder(id);


res.json({
success: true,
message: 'Order deleted successfully',
data: result,
});
};



export const orderController = {
createOrder,
getAllOrders,
getSingleOrder,
updateOrderStatus,
 deleteOrder
}