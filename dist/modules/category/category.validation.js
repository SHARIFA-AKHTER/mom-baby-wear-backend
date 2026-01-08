"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
exports.categoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().min(1, "Category image is required")
    }),
    query: zod_1.z.object({}).optional(),
    params: zod_1.z.object({}).optional(),
});
