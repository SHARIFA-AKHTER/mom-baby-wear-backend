"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const paginationHelper_1 = require("../../utils/paginationHelper");
const createProduct = async (payload) => {
    return prisma_1.prisma.product.create({ data: payload });
};
const getProducts = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
            ],
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            category: true,
        },
    });
    const total = await prisma_1.prisma.product.count({
        where: whereConditions
    });
    return {
        meta: { page, limit, total },
        result: result,
    };
};
const getProductById = async (id) => {
    return prisma_1.prisma.product.findUnique({ where: { id } });
};
const updateProduct = async (id, payload) => {
    return prisma_1.prisma.product.update({ where: { id }, data: payload });
};
const deleteProduct = (id) => {
    return prisma_1.prisma.product.delete({ where: { id } });
};
exports.productService = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
