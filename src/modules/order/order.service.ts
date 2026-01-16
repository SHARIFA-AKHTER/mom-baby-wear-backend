import { OrderStatus } from '@prisma/client';
import { prisma } from '../../app/shared/prisma';
import { IOrder } from './order.interface';
import { paginationHelper } from '../../utils/paginationHelper';


const createOrder = async (userId: string, payload: IOrder) => {
  const total = await calculateTotal(payload.items); 

  const order = await prisma.order.create({
    data: {
      userId,
      items: payload.items as any,
      total,
      status: OrderStatus.PENDING, 
    },
  });

  return order;
};

const calculateTotal = async (items: any[]) => {
  let total = 0;

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product) throw new Error('Product not found');

    total += product.price * item.quantity;
  }

  return total;
};


const getAllOrders = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { id: { contains: searchTerm } }, 
        
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value
      })),
    });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    where: whereConditions,
    include: { user: true },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.order.count({ where: whereConditions });

  return {
    meta: { page, limit, total },
    result: result,
  };
};

// Get Single Order
const getSingleOrder = (id: string) => {
  return prisma.order.findUnique({
    where: { id },
  });
};


const updateOrderStatus = (id: string, status: OrderStatus) => {
  return prisma.order.update({
    where: { id },
    data: { status},
  });
};

const deleteOrder = (id: string) => {
  return prisma.order.delete({
    where: { id },
  });
};

export const orderService = {
  createOrder,
  calculateTotal,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
};
