"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponValidation = exports.createCouponValidation = void 0;
const zod_1 = require("zod");
exports.createCouponValidation = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(3),
        discountType: zod_1.z.enum(["PERCENT", "FLAT"]),
        discountValue: zod_1.z.number().positive(),
        expiry: zod_1.z.string().datetime(),
        minOrderValue: zod_1.z.number().optional(),
    })
});
exports.updateCouponValidation = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(3).optional(),
        discountType: zod_1.z.enum(["PERCENT", "FLAT"]).optional(),
        discountValue: zod_1.z.number().positive().optional(),
        expiry: zod_1.z.string().datetime().optional(),
        minOrderValue: zod_1.z.number().optional(),
        isActive: zod_1.z.boolean().optional(),
    })
});
