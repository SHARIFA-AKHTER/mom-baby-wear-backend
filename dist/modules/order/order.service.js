"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../app/shared/prisma");
const createOrder = async (userId, payload) => {
    const total = await calculateTotal(payload.items);
    const order = await prisma_1.prisma.order.create({
        data: {
            userId,
            items: payload.items,
            total,
            status: client_1.OrderStatus.PENDING,
        },
    });
    return order;
};
const calculateTotal = async (items) => {
    let total = 0;
    for (const item of items) {
        const product = await prisma_1.prisma.product.findUnique({
            where: { id: item.productId },
        });
        if (!product)
            throw new Error('Product not found');
        total += product.price * item.quantity;
    }
    return total;
};
const getAllOrders = () => {
    return prisma_1.prisma.order.findMany({
        include: {
            user: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};
// Get Single Order
const getSingleOrder = (id) => {
    return prisma_1.prisma.order.findUnique({
        where: { id },
    });
};
const updateOrderStatus = (id, status) => {
    return prisma_1.prisma.order.update({
        where: { id },
        data: { status },
    });
};
const deleteOrder = (id) => {
    return prisma_1.prisma.order.delete({
        where: { id },
    });
};
exports.orderService = {
    createOrder,
    calculateTotal,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder,
};
