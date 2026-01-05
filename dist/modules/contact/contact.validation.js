"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
const zod_1 = require("zod");
const createContactMessageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, { message: 'Name is required' }),
        email: zod_1.z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        message: zod_1.z
            .string()
            .min(1, { message: 'Message is required' }),
    }),
});
exports.ContactValidation = {
    createContactMessageZodSchema,
};
