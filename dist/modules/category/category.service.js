"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const createCategory = async (payload) => {
    const slug = payload.name.toLowerCase().replace(/\s+/g, "-");
    return await prisma_1.prisma.category.create({
        data: { ...payload, slug }
    });
};
;
const getCategories = async () => {
    return await prisma_1.prisma.category.findMany();
};
const getSingleCategory = async (id) => {
    return await prisma_1.prisma.category.findUnique({
        where: { id },
        include: {
            products: true
        }
    });
};
const updateCategory = async (id, payload) => {
    return await prisma_1.prisma.category.update({ where: { id }, data: payload });
};
const deleteCategory = async (id) => {
    return await prisma_1.prisma.category.delete({ where: { id } });
};
exports.CategoryService = {
    createCategory,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
