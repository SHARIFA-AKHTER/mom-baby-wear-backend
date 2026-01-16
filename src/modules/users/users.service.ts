// src/modules/users/users.service.ts
import bcrypt from "bcrypt";

import { IUser } from "./users.interface";
import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";
import { paginationHelper } from "../../utils/paginationHelper";
import { Prisma } from "@prisma/client";


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


const getAllUsers = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
        { email: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value
      })),
    });
  }

 const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: { page, limit, total },
    result: result,
  };
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
