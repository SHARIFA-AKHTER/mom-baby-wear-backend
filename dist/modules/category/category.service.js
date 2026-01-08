"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../app/shared/prisma");
// const createCategory = async (payload: ICategory) => {
//   const slug = payload.name.toLowerCase().replace(/\s+/g, "-"); 
//   return await prisma.category.create({ 
//     data: { ...payload, slug } 
//   });
// };;
const createCategory = async (payload) => {
    const slug = payload.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    return await prisma_1.prisma.category.create({
        data: {
            name: payload.name,
            image: payload.image,
            slug: slug
        }
    });
};
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
    const isExist = await prisma_1.prisma.category.findUnique({ where: { id } });
    if (!isExist) {
        throw new Error("Category not found!");
    }
    const { products, ...updateData } = payload;
    if (updateData.name) {
        updateData.slug = updateData.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    }
    return await prisma_1.prisma.category.update({
        where: { id },
        data: updateData,
    });
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
