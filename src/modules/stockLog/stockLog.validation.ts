import { z } from "zod";

export const createStockLogSchema = z.object({
 
    productId: z.string().uuid("Invalid productId"),
    change: z.number(),
    reason: z.enum(["ORDER", "RESTOCK", "CANCEL"]),
  })

