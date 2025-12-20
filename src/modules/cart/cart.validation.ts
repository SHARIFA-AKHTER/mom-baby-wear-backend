import { z } from "zod";

export const addToCartValidation = z.object({

    productId: z.string(),
    quantity: z.number().min(1),
  })

