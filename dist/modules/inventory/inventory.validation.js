"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventoryValidation = void 0;
const zod_1 = require("zod");
exports.updateInventoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().min(0),
    }),
});
