"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const cart_service_1 = require("./cart.service");
const addToCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cart_service_1.CartService.addToCart(req.user.id, req.body);
    res.json({ success: true, message: "Item added to cart", data: result });
});
const getCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cart_service_1.CartService.getCart(req.user.id);
    res.json({ success: true, data: result });
});
const removeItem = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cart_service_1.CartService.removeItem(req.user.id, req.params.productId);
    res.json({ success: true, message: "Removed item", data: result });
});
const clearCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cart_service_1.CartService.clearCart(req.user.id);
    res.json({ success: true, message: "Cart cleared", data: result });
});
exports.CartController = {
    addToCart,
    getCart,
    removeItem,
    clearCart
};
