import { Prisma } from "@prisma/client";
import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";
import { paginationHelper } from "../../utils/paginationHelper";

const updateStock = async (productId: string, quantity: number) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new ApiError(404, "Product not found");

  const lowStock = quantity < 5;

  return prisma.inventory.upsert({
    where: { productId },
    update: { quantity, lowStock },
    create: { productId, quantity, lowStock },
  });
};

const getInventory = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andConditions: Prisma.InventoryWhereInput[] = [];

  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.InventoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.inventory.findMany({
    where: whereConditions,
    include: { product: true },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.inventory.count({ where: whereConditions });
  return { meta: { page, limit, total }, result };
};
const getProductInventory = async (productId: string) => {
  const item = await prisma.inventory.findUnique({
    where: { productId },
    include: { product: true },
  });
  if (!item) throw new ApiError(404, "Inventory not found");
  return item;
};
export const InventoryService = {
  updateStock,
  getInventory,
  getProductInventory,
};
