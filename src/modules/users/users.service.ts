// src/modules/users/users.service.ts
import bcrypt from "bcrypt";

import { IUser } from "./users.interface";
import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";

// const createUser = async (payload: IUser) => {
//   const hashedPassword = await bcrypt.hash(payload.password, 10);
//   return prisma.user.create({
//     data: { ...payload, password: hashedPassword },
//   });
// };
const createUser = async (payload: IUser) => {
  console.log("PAYLOAD:", payload);

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
    
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
};


const getAllUsers = () => {
  return prisma.user.findMany();
};

const getSingleUser = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

const deleteUser = (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const usersService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
