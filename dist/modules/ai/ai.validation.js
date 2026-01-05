"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiCouponValidation = exports.aiChatValidation = exports.aiReviewValidation = void 0;
const zod_1 = require("zod");
exports.aiReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().min(3),
    })
});
exports.aiChatValidation = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string().min(2),
    })
});
exports.aiCouponValidation = zod_1.z.object({
    body: zod_1.z.object({
        cartTotal: zod_1.z.number().positive(),
    })
});
