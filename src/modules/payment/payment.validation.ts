import { z } from "zod";

export const paymentInitValidation = z.object({
  amount: z.number(),
  orderId: z.string(),
  customerName: z.string(),
  customerPhone: z.string(),
  customerEmail: z.string().email(),
});