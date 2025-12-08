import { OrderStatus } from '@prisma/client';
import { prisma } from '../../app/shared/prisma';
import { IOrder } from './order.interface';


const createOrder = async (userId: string, payload: IOrder) => {
  const total = await calculateTotal(payload.items); 

  const order = await prisma.order.create({
    data: {
      userId,
      items: payload.items as any,
      total,
      status: 'PENDING', 
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


const getAllOrders = () => {
  return prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
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
