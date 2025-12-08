import { z } from 'zod';


export const createProductSchema = z.object({
body: z.object({
title: z.string().min(1),
description: z.string().optional(),
price: z.number().nonnegative(),
stock: z.number().int().nonnegative().optional(),
categoryId: z.string().optional(),
images: z.array(z.string()).optional()
})
});