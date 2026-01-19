"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const pick_1 = __importDefault(require("../../utils/pick"));
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
const createOrder = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("Request Body:", req.body);
    if (!req.user) {
        return (0, sendResponse_1.sendResponse)(res, 401, false, 'Unauthorized', null);
    }
    const userId = req.user.id;
    const result = await order_service_1.orderService.createOrder(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, 'Order created successfully', result);
});
const getAllOrders = async (_req, res) => {
    const filters = (0, pick_1.default)(_req.query, ['searchTerm', 'status', 'userId']);
    const options = (0, pick_1.default)(_req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const dataWithMeta = await order_service_1.orderService.getAllOrders(filters, options);
    (0, sendResponse_1.sendResponse)(res, 200, true, "order fetched successfully", dataWithMeta);
};
const getSingleOrder = async (req, res) => {
    const { id } = req.params;
    const result = await order_service_1.orderService.getSingleOrder(id);
    res.json({
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
};
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await order_service_1.orderService.updateOrderStatus(id, status);
    res.json({
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
};
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const result = await order_service_1.orderService.deleteOrder(id);
    res.json({
        success: true,
        message: 'Order deleted successfully',
        data: result,
    });
};
exports.orderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder
};
