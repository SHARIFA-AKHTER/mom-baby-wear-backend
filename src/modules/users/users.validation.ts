import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "MANAGER", "STAFF", "CUSTOMER"]).optional(),
});