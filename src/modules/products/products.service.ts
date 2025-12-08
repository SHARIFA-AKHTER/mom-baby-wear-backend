import { PrismaClient } from "@prisma/client";
import { IProduct } from "./product.interface";



const prisma = new PrismaClient();


export const productService = {
async createProduct(payload: IProduct) {
return prisma.product.create({ data: payload });
},


async getProducts() {
return prisma.product.findMany();
},


async getProductById(id: string) {
return prisma.product.findUnique({ where: { id } });
},


async updateProduct(id: string, payload: Partial<IProduct>) {
return prisma.product.update({ where: { id }, data: payload });
},


async deleteProduct(id: string) {
return prisma.product.delete({ where: { id } });
},
};