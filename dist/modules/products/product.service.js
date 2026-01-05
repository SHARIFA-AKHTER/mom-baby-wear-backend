"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const createProduct = async (payload) => {
    return prisma_1.prisma.product.create({ data: payload });
};
const getProducts = async () => {
    return prisma_1.prisma.product.findMany();
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
