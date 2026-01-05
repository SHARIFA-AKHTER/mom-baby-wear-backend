"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSettingsService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const ApiError_1 = require("../../utils/ApiError");
const setSetting = (key, value) => {
    return prisma_1.prisma.adminSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value },
    });
};
const getSettings = () => {
    return prisma_1.prisma.adminSettings.findMany();
};
const getSetting = async (key) => {
    const setting = await prisma_1.prisma.adminSettings.findUnique({ where: { key } });
    if (!setting)
        throw new ApiError_1.ApiError(404, "Setting not found");
    return setting;
};
exports.AdminSettingsService = {
    setSetting,
    getSettings,
    getSetting
};
