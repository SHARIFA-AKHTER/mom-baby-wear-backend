import { z } from "zod";

export const addToWishlistValidation = z.object({
  body: z.object({
    productId: z.string(),
  }),
});
