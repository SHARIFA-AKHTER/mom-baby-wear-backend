"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const ApiError_1 = require("../../utils/ApiError");
const createCoupon = async (payload) => {
    const exist = await prisma_1.prisma.coupon.findUnique({
        where: { code: payload.code },
    });
    if (exist)
        throw new ApiError_1.ApiError(400, "Coupon code already exists");
    const result = await prisma_1.prisma.coupon.create({ data: payload });
    return result;
};
const getAllCoupons = async () => {
    return prisma_1.prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
    });
};
const getSingleCoupon = async (id) => {
    const coupon = await prisma_1.prisma.coupon.findUnique({ where: { id } });
    if (!coupon)
        throw new ApiError_1.ApiError(404, "Coupon not found");
    return coupon;
};
const updateCoupon = async (id, payload) => {
    const exist = await prisma_1.prisma.coupon.findUnique({ where: { id } });
    if (!exist)
        throw new ApiError_1.ApiError(404, "Coupon not found");
    const result = await prisma_1.prisma.coupon.update({
        where: { id },
        data: payload,
    });
    return result;
};
const deleteCoupon = async (id) => {
    const exist = await prisma_1.prisma.coupon.findUnique({ where: { id } });
    if (!exist)
        throw new ApiError_1.ApiError(404, "Coupon not found");
    await prisma_1.prisma.coupon.delete({ where: { id } });
    return { message: "Coupon deleted successfully" };
};
exports.CouponService = {
    createCoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon,
};
