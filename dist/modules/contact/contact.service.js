"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const createMessage = async (data) => {
    const result = await prisma_1.prisma.contactMessage.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message
        },
    });
    return result;
};
const getAllMessages = async () => {
    const result = await prisma_1.prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
};
const deleteMessage = async (id) => {
    const result = await prisma_1.prisma.contactMessage.delete({
        where: { id },
    });
    return result;
};
exports.ContactService = {
    createMessage,
    getAllMessages,
    deleteMessage
};
