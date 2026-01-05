"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentInitValidation = void 0;
const zod_1 = require("zod");
exports.paymentInitValidation = zod_1.z.object({
    amount: zod_1.z.number(),
    orderId: zod_1.z.string(),
    customerName: zod_1.z.string(),
    customerPhone: zod_1.z.string(),
    customerEmail: zod_1.z.string().email(),
});
