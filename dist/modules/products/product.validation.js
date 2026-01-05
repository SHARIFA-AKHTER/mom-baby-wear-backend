"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        price: zod_1.z.number().min(1),
        stock: zod_1.z.number().min(0),
        description: zod_1.z.string().min(5),
        images: zod_1.z.array(zod_1.z.string()),
        categoryId: zod_1.z.string().min(1),
    }),
});
