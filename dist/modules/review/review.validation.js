"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidation = void 0;
const zod_1 = require("zod");
exports.createReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        comment: zod_1.z.string().optional(),
    })
});
