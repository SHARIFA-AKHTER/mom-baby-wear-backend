import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IUser } from "./users.interface";


const prisma = new PrismaClient();


const createUser = async (payload: IUser) =>{
const hashedPassword = await bcrypt.hash(payload.password, 10);
return prisma.user.create({
data: { ...payload, password: hashedPassword },
});
}


const getAllUsers = () =>{
return prisma.user.findMany();
}

const getSingleUser = (id: string)=> {
return prisma.user.findUnique({ where: { id } });
}

const deleteUser = (id: string) =>{
return prisma.user.delete({ where: { id } });
}
export const usersService = {
createUser,
getAllUsers,
getSingleUser,
deleteUser

};