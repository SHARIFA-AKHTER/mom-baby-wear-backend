
import { prisma } from "../../app/shared/prisma";
import { IProduct } from "./product.interface";



const createProduct = async(payload: IProduct) =>{
return prisma.product.create({ data: payload });
}


const getProducts = async() =>{
return prisma.product.findMany();
}


const getProductById = async(id: string)=> {
return prisma.product.findUnique({ where: { id } });
}


const updateProduct = async(id: string, payload: Partial<IProduct>)=>{
return prisma.product.update({ where: { id }, data: payload });
}


const deleteProduct = (id: string) =>{
return prisma.product.delete({ where: { id } });
}
export const productService = {
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct
};