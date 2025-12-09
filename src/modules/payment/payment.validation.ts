import { z } from "zod";

export const paymentInitValidation = z.object({
  amount: z.number(),
  orderId: z.string(),
});

export const paymentVerifyValidation = z.object({
  val_id: z.string(),
  orderId: z.string(),
})