

import { prisma } from '../../app/shared/prisma';
import { IContactMessage } from './contact.interface';



const createMessage = async (data: IContactMessage) => {
  const result = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message
    },
  });
  return result;
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