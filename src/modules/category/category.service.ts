

import { prisma } from "../../app/shared/prisma";
import { ICategory } from "./category.interface";



// const createCategory = async (payload: ICategory) => {
//   const slug = payload.name.toLowerCase().replace(/\s+/g, "-"); 
  
//   return await prisma.category.create({ 
//     data: { ...payload, slug } 
//   });
// };;
const createCategory = async (payload: ICategory) => {

  const slug = payload.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") 
    .replace(/\s+/g, "-");    
  
  return await prisma.category.create({ 
    data: { 
      name: payload.name,
      image: payload.image,
      slug: slug 
    } 
  });
};


const getCategories = async () => {
return await prisma.category.findMany();
};



const getSingleCategory = async (id: string) => {
  return await prisma.category.findUnique({ 
    where: { id },
    include: {
      products: true 
    }
  });
}

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
 
  const isExist = await prisma.category.findUnique({ where: { id } });
  if (!isExist) {
    throw new Error("Category not found!");
  }

  const { products,...updateData } = payload as any;

  if (updateData.name) {
    updateData.slug = updateData.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") 
      .replace(/\s+/g, "-");   
  }

 
  return await prisma.category.update({
    where: { id },
    data: updateData,
  });
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
};