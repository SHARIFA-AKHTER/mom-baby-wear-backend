import { z } from "zod";


export const categoryValidation = z.object({
body: z.object({
name: z.string().min(1),
description: z.string().optional(),
image: z.string().optional()
})
});