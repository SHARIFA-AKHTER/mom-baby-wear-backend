import { z } from "zod";

export const createCouponValidation = z.object({
  body: z.object({
  code: z.string().min(3),
  discountType: z.enum(["PERCENT", "FLAT"]),
  discountValue: z.number().positive(),
  expiry: z.string().datetime(),
  minOrderValue: z.number().optional(),
})
});

export const updateCouponValidation = z.object({
  body: z.object({
  code: z.string().min(3).optional(),
  discountType: z.enum(["PERCENT", "FLAT"]).optional(),
  discountValue: z.number().positive().optional(),
  expiry: z.string().datetime().optional(),
  minOrderValue: z.number().optional(),
  isActive: z.boolean().optional(),
})
});
