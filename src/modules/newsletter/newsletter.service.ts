import { prisma } from "../../app/shared/prisma";
import { INewsletter } from "./newsletter.interface";

const subscribe = async (data: INewsletter) => {

  const isExist = await prisma.newsletter.findUnique({
    where: { email: data.email }
  });

  if (isExist) {
    throw new Error("You are already subscribed!");
  }

  const result = await prisma.newsletter.create({
    data
  });
  return result;
};


const getAllSubscribers = async () => {
  return await prisma.newsletter.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const newsletterService = {
  subscribe,
  getAllSubscribers
};