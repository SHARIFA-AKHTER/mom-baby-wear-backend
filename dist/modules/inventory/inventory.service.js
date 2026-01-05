"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const ApiError_1 = require("../../utils/ApiError");
const updateStock = async (productId, quantity) => {
    const product = await prisma_1.prisma.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new ApiError_1.ApiError(404, "Product not found");
    const lowStock = quantity < 5;
    return prisma_1.prisma.inventory.upsert({
        where: { productId },
        update: { quantity, lowStock },
        create: { productId, quantity, lowStock },
    });
};
const getInventory = () => {
    return prisma_1.prisma.inventory.findMany({
        include: { product: true },
    });
};
const getProductInventory = async (productId) => {
    const item = await prisma_1.prisma.inventory.findUnique({
        where: { productId },
        include: { product: true },
    });
    if (!item)
        throw new ApiError_1.ApiError(404, "Inventory not found");
    return item;
};
exports.InventoryService = {
    updateStock,
    getInventory,
    getProductInventory
};
