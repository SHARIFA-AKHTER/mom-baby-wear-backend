"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const ai_service_1 = require("../ai/ai.service");
// const createMessage = async (data: IContactMessage) => {
//   const result = await prisma.contactMessage.create({
//     data: {
//       name: data.name,
//       email: data.email,
//       message: data.message
//     },
//   });
//   return result;
// };
const createMessage = async (data) => {
    const savedMessage = await prisma_1.prisma.contactMessage.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
    });
    const aiReply = await ai_service_1.AIService.chatSupport(data.message);
    const finalData = {
        ...savedMessage,
        autoReply: aiReply,
    };
    console.log("Final Object before return:", finalData);
    return finalData;
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
