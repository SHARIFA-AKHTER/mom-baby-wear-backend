"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const addToCart = async (userId, payload) => {
    let cart = await prisma_1.prisma.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        return prisma_1.prisma.cart.create({
            data: {
                userId,
                items: [payload],
            },
        });
    }
    const items = cart.items;
    const existing = items.find((i) => i.productId === payload.productId);
    if (existing) {
        existing.quantity += payload.quantity;
    }
    else {
        items.push(payload);
    }
    return prisma_1.prisma.cart.update({
        where: { userId },
        data: { items: items },
    });
};
const getCart = (userId) => {
    return prisma_1.prisma.cart.findUnique({ where: { userId } });
};
const removeItem = async (userId, productId) => {
    const cart = await prisma_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        return null;
    let items = cart.items;
    items = items.filter((item) => item.productId !== productId);
    return prisma_1.prisma.cart.update({
        where: { userId },
        data: { items: items },
    });
};
const clearCart = (userId) => {
    return prisma_1.prisma.cart.update({
        where: { userId },
        data: { items: [] },
    });
};
exports.CartService = {
    addToCart,
    getCart,
    removeItem,
    clearCart,
};
