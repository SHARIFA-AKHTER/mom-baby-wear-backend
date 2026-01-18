import { Prisma } from "@prisma/client";
import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";
import { ICoupon } from "./coupon.interface";
import { paginationHelper } from "../../utils/paginationHelper";

const createCoupon = async (payload: ICoupon) => {
  const exist = await prisma.coupon.findUnique({
    where: { code: payload.code },
  });
  if (exist) throw new ApiError(400, "Coupon code already exists");

  const result = await prisma.coupon.create({ data: payload });
  return result;
};

const getAllCoupons = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions: Prisma.CouponWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { code: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
      ],
    });
  }

  const whereConditions: Prisma.CouponWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.coupon.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.coupon.count({ where: whereConditions });
  return { meta: { page, limit, total }, result };
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
