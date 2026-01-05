"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const add = async (userId, productId) => {
    let wishlist = await prisma_1.prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist) {
        return prisma_1.prisma.wishlist.create({
            data: {
                userId,
                items: [productId],
            },
        });
    }
    const items = wishlist.items;
    if (!items.includes(productId))
        items.push(productId);
    return prisma_1.prisma.wishlist.update({
        where: { userId },
        data: { items },
    });
};
const get = async (userId) => {
    const wishlist = await prisma_1.prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist || !wishlist.items) {
        return [];
    }
    const productIds = wishlist.items;
    const products = await prisma_1.prisma.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });
    return products;
};
const remove = async (userId, productId) => {
    let wishlist = await prisma_1.prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist)
        return null;
    const items = wishlist.items.filter((id) => id !== productId);
    return prisma_1.prisma.wishlist.update({
        where: { userId },
        data: { items },
    });
};
exports.WishlistService = {
    add,
    get,
    remove
};
