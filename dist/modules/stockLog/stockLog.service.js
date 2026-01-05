"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockLogService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const createStockLog = async (payload) => {
    // check if product exists
    const product = await prisma_1.prisma.product.findUnique({
        where: { id: payload.productId },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    const stockLog = await prisma_1.prisma.stockLog.create({
        data: {
            productId: payload.productId,
            change: payload.change,
            reason: payload.reason,
        },
    });
    // update product stock
    await prisma_1.prisma.product.update({
        where: { id: payload.productId },
        data: { stock: product.stock + payload.change },
    });
    return stockLog;
};
const getAllStockLogs = async () => {
    return prisma_1.prisma.stockLog.findMany({
        include: { product: true },
        orderBy: { createdAt: "desc" },
    });
};
exports.stockLogService = {
    createStockLog,
    getAllStockLogs,
};
