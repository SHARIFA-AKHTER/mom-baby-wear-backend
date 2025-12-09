import { z } from "zod";

export const updateInventoryValidation = z.object({
  body: z.object({
    quantity: z.number().min(0),
  }),
});
