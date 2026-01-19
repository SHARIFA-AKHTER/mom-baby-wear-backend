"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../app/shared/prisma");
const paginationHelper_1 = require("../../utils/paginationHelper");
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
const getAllReviews = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                { comment: { contains: searchTerm, mode: client_1.Prisma.QueryMode.insensitive } },
            ],
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([field, value]) => ({ [field]: value })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.review.findMany({
        where: whereConditions,
        include: { user: true, product: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = await prisma_1.prisma.review.count({ where: whereConditions });
    return { meta: { page, limit, total }, result };
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
const getPublicStats = async () => {
    const [totalUsers, totalProducts, totalReviews] = await Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.product.count(),
        prisma_1.prisma.review.count({ where: { approved: true } })
    ]);
    return {
        happyMoms: totalUsers + 100,
        productsSold: totalProducts * 5,
        totalReviews: totalReviews,
        avgRating: "4.9/5"
    };
};
exports.reviewService = {
    createReview,
    getProductReviews,
    getAllReviews,
    approveReview,
    deleteReview,
    getPublicStats
};
