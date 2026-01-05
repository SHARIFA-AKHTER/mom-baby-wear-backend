"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const createReview = async (userId, payload) => {
    const { productId, rating, comment } = payload;
    // Prevent multiple reviews by the same user
    const existing = await prisma_1.prisma.review.findFirst({
        where: { userId, productId },
    });
    if (existing) {
        throw new Error("You already reviewed this product.");
    }
    const review = await prisma_1.prisma.review.create({
        data: {
            userId,
            productId,
            rating,
            comment,
        },
    });
    return review;
};
const getProductReviews = (productId) => {
    return prisma_1.prisma.review.findMany({
        where: { productId, approved: true },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};
const getAllReviews = () => {
    return prisma_1.prisma.review.findMany({
        include: {
            user: true,
            product: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};
const approveReview = (id) => {
    return prisma_1.prisma.review.update({
        where: { id },
        data: { approved: true },
    });
};
const deleteReview = (id) => {
    return prisma_1.prisma.review.delete({
        where: { id },
    });
};
exports.reviewService = {
    createReview,
    getProductReviews,
    getAllReviews,
    approveReview,
    deleteReview
};
