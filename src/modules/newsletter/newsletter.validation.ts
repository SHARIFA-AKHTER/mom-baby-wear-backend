import { z } from 'zod';

export const newsletterValidation = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required") 
      .email("Invalid email address"), 
  }),
});