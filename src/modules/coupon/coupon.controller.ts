

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ICoupon } from "./coupon.interface";
import { CouponService } from "./coupon.service";


const createCoupon = catchAsync(async (req: { body: ICoupon; }, res: any) => {
  const result = await CouponService.createCoupon(req.body);
  sendResponse(res, 201, true, "Coupon created successfully", result);
});

const getAllCoupons = catchAsync(async (req: any, res: any) => {
  const result = await CouponService.getAllCoupons();
  sendResponse(res, 200, true, "Coupons retrieved", result);
});

const getSingleCoupon = catchAsync(async (req: { params: { id: string; }; }, res: any) => {
  const result = await CouponService.getSingleCoupon(req.params.id);
  sendResponse(res, 200, true, "Coupon retrieved", result);
});

const updateCoupon = catchAsync(async (req: { params: { id: string; }; body: Partial<ICoupon>; }, res: any) => {
  const result = await CouponService.updateCoupon(req.params.id, req.body);
  sendResponse(res, 200, true, "Coupon updated", result);
});

const deleteCoupon = catchAsync(async (req: { params: { id: string; }; }, res: any) => {
  const result = await CouponService.deleteCoupon(req.params.id);
  sendResponse(res, 200, true, "Coupon deleted", result);
});

export const CouponController = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
