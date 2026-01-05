"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSettingValidation = void 0;
const zod_1 = require("zod");
exports.adminSettingValidation = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string().min(1),
        value: zod_1.z.string().min(1),
    })
});
