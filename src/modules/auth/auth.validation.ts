import { z } from 'zod';


export const registerSchema = z.object({
body: z.object({
name: z.string().min(1).optional(),
email: z.string(),
password: z.string().min(6)
})
});


export const loginSchema = z.object({
body: z.object({
email: z.string(),
password: z.string().min(6)
})
});