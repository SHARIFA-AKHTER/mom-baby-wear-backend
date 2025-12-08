import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IUser } from "./users.interface";


const prisma = new PrismaClient();


export const usersService = {
async createUser(payload: IUser) {
const hashedPassword = await bcrypt.hash(payload.password, 10);
return prisma.user.create({
data: { ...payload, password: hashedPassword },
});
},


async getAllUsers() {
return prisma.user.findMany();
},


async getSingleUser(id: string) {
return prisma.user.findUnique({ where: { id } });
},


async deleteUser(id: string) {
return prisma.user.delete({ where: { id } });
},
};