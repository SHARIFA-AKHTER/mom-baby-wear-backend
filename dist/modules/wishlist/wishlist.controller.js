"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const wishlist_service_1 = require("./wishlist.service");
const add = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await wishlist_service_1.WishlistService.add(req.user.id, req.body.productId);
    res.json({ success: true, message: "Added to wishlist", data: result });
});
const get = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await wishlist_service_1.WishlistService.get(req.user.id);
    res.json({ success: true, data: result });
});
const remove = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await wishlist_service_1.WishlistService.remove(req.user.id, req.params.productId);
    res.json({ success: true, message: "Removed", data: result });
});
exports.WishlistController = {
    add,
    get,
    remove
};
