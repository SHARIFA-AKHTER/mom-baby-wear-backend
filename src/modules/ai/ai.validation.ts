import { z } from "zod";

export const aiReviewValidation = z.object({
  comment: z.string().min(3),
});

export const aiChatValidation = z.object({
  message: z.string().min(2),
});

export const aiCouponValidation = z.object({
  cartTotal: z.number().positive(),
});
