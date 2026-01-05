"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToWishlistValidation = void 0;
const zod_1 = require("zod");
exports.addToWishlistValidation = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
    })
});
