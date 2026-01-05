import { z } from 'zod';

const createContactMessageZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required' }), 
      
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
      
    message: z
      .string()
      .min(1, { message: 'Message is required' }),
  }),
});

export const ContactValidation = {
  createContactMessageZodSchema,
};