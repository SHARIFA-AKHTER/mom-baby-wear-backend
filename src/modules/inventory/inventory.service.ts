import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";



  const updateStock = async (productId: string, quantity: number) =>{
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new ApiError(404, "Product not found");

    const lowStock = quantity < 5;

    return prisma.inventory.upsert({
      where: { productId },
      update: { quantity, lowStock },
      create: { productId, quantity, lowStock },
    });
  }

 const  getInventory = ()=> {
    return prisma.inventory.findMany({
      include: { product: true },
    });
  }

  const getProductInventory = async (productId: string)=> {
    const item = await prisma.inventory.findUnique({
      where: { productId },
      include: { product: true },
    });
    if (!item) throw new ApiError(404, "Inventory not found");
    return item;
  }
  export const InventoryService = {
 updateStock,
 getInventory,
 getProductInventory 

};
