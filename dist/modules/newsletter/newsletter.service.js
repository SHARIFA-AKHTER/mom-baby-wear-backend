"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const subscribe = async (data) => {
    const isExist = await prisma_1.prisma.newsletter.findUnique({
        where: { email: data.email }
    });
    if (isExist) {
        throw new Error("You are already subscribed!");
    }
    const result = await prisma_1.prisma.newsletter.create({
        data
    });
    return result;
};
const getAllSubscribers = async () => {
    return await prisma_1.prisma.newsletter.findMany({
        orderBy: { createdAt: 'desc' }
    });
};
exports.newsletterService = {
    subscribe,
    getAllSubscribers
};
