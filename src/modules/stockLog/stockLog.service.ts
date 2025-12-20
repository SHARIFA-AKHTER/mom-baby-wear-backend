import { prisma } from "../../app/shared/prisma";
import { IStockLog } from "./stockLog.interface";

const createStockLog = async (payload: IStockLog) => {
  // check if product exists
  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const stockLog = await prisma.stockLog.create({
    data: {
      productId: payload.productId,
      change: payload.change,
      reason: payload.reason,
    },
  });

  // update product stock
  await prisma.product.update({
    where: { id: payload.productId },
    data: { stock: product.stock + payload.change },
  });

  return stockLog;
};

const getAllStockLogs = async () => {
  return prisma.stockLog.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
};

export const stockLogService = {
  createStockLog,
  getAllStockLogs,
};
