"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const coupon_service_1 = require("./coupon.service");
const createCoupon = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await coupon_service_1.CouponService.createCoupon(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Coupon created successfully", result);
});
const getAllCoupons = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await coupon_service_1.CouponService.getAllCoupons();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Coupons retrieved", result);
});
const getSingleCoupon = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await coupon_service_1.CouponService.getSingleCoupon(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Coupon retrieved", result);
});
const updateCoupon = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await coupon_service_1.CouponService.updateCoupon(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Coupon updated", result);
});
const deleteCoupon = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await coupon_service_1.CouponService.deleteCoupon(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Coupon deleted", result);
});
exports.CouponController = {
    createCoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon,
};
