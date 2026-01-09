

import { prisma } from '../../app/shared/prisma';
import { AIService } from '../ai/ai.service';
import { IContactMessage } from './contact.interface';



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


const createMessage = async (data: { name: string; email: string; message: string }) => {

  const savedMessage = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
    },
  });

const aiReply = await AIService.chatSupport(data.message);
const finalData = {
    ...savedMessage,
    autoReply: aiReply,
};
console.log("Final Object before return:", finalData);
return finalData;
};



const getAllMessages = async () => {
  const result = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};
const deleteMessage = async (id: string) => {
  const result = await prisma.contactMessage.delete({
    where: { id },
  });
  return result;
};

export const ContactService = {
  createMessage,
  getAllMessages,
  deleteMessage
};