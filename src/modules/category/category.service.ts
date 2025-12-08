
import { prisma } from "../../app/shared/prisma";
import { ICategory } from "./category.interface";


const createCategory = async (payload: ICategory) => {
return await prisma.category.create({ data: payload });
};


const getCategories = async () => {
return await prisma.category.findMany();
};


const getSingleCategory = async (id: string) => {
return await prisma.category.findUnique({ where: { id } });
};


const updateCategory = async (id: string, payload: Partial<ICategory>) => {
return await prisma.category.update({ where: { id }, data: payload });
};


const deleteCategory = async (id: string) => {
return await prisma.category.delete({ where: { id } });
};


export const CategoryService = {
createCategory,
getCategories,
getSingleCategory,
updateCategory,
deleteCategory,
}