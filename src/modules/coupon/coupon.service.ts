
import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";
import { ICoupon } from "./coupon.interface";


const createCoupon = async (payload: ICoupon) => {
  const exist = await prisma.coupon.findUnique({
    where: { code: payload.code },
  });
  if (exist) throw new ApiError(400, "Coupon code already exists");

  const result = await prisma.coupon.create({ data: payload });
  return result;
};

const getAllCoupons = async () => {
  return prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getSingleCoupon = async (id: string) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new ApiError(404, "Coupon not found");
  return coupon;
};

const updateCoupon = async (id: string, payload: Partial<ICoupon>) => {
  const exist = await prisma.coupon.findUnique({ where: { id } });
  if (!exist) throw new ApiError(404, "Coupon not found");

  const result = await prisma.coupon.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteCoupon = async (id: string) => {
  const exist = await prisma.coupon.findUnique({ where: { id } });
  if (!exist) throw new ApiError(404, "Coupon not found");

  await prisma.coupon.delete({ where: { id } });
  return { message: "Coupon deleted successfully" };
};

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
