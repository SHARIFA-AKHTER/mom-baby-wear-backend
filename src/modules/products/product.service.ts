
import { prisma } from "../../app/shared/prisma";
import { paginationHelper } from "../../utils/paginationHelper";
import { IProduct } from "./product.interface";



const createProduct = async(payload: IProduct) =>{
return prisma.product.create({ data: payload });
}


const getProducts = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
    });
  }


  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: any = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.product.count({ 
    where: whereConditions
  });

  return {
    meta: { page, limit, total },
    result: result,
  };
};


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