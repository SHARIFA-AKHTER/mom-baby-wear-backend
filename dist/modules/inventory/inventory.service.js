"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const ApiError_1 = require("../../utils/ApiError");
const paginationHelper_1 = require("../../utils/paginationHelper");
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
const getInventory = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const andConditions = [];
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.entries(filters).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.inventory.findMany({
        where: whereConditions,
        include: { product: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = await prisma_1.prisma.inventory.count({ where: whereConditions });
    return { meta: { page, limit, total }, result };
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
    getProductInventory,
};
