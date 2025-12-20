import { z } from "zod";

export const addToWishlistValidation = z.object({

    productId: z.string(),
  })

