import { z } from 'zod';


export const createOrderValidation = z.object({

items: z.array(
z.object({
productId: z.string(),
quantity: z.number().min(1),
})
),
})
