"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStockLogSchema = void 0;
const zod_1 = require("zod");
exports.createStockLogSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid("Invalid productId"),
    change: zod_1.z.number(),
    reason: zod_1.z.enum(["ORDER", "RESTOCK", "CANCEL"]),
});
