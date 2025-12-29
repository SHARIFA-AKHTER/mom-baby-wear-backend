import { z } from 'zod';
export const createOrderValidation = z.object({
  body: z.object({
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      })
    ),
  })
});

// import { z } from 'zod';

// export const createOrderValidation = z.object({

//   customerName: z.string().min(1, "Name is required"),
  
//   customerPhone: z.string().min(1, "Phone number is required"),

//   customerEmail: z.string()
//     .email("Invalid email address")
//     .optional()
//     .or(z.literal("")),

//   address: z.string().min(1, "Full address is required"),

//   city: z.string().min(1, "City is required"),


//   amount: z.number().positive("Amount must be a positive number"),

//   orderId: z.string().min(1, "Order ID is required"),

//   items: z.array(
//     z.object({
//       productId: z.string().min(1, "Product ID is required"),
//       quantity: z.number().positive("Quantity must be a positive number"),
//     })
//   ).optional(),
// });