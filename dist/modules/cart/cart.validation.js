"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartValidation = void 0;
const zod_1 = require("zod");
exports.addToCartValidation = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().min(1),
});
