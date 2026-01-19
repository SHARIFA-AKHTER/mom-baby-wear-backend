"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterValidation = void 0;
const zod_1 = require("zod");
exports.newsletterValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
    }),
});
