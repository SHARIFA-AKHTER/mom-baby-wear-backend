import { prisma } from "../../app/shared/prisma";
import { ICartItem } from "./cart.interface";
import { Prisma } from "@prisma/client";

const addToCart = async (userId: string, payload: ICartItem) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    return prisma.cart.create({
      data: {
        userId,
        items: [payload] as unknown as Prisma.InputJsonValue,
      },
    });
  }

  const items = cart.items as unknown as ICartItem[];

  const existing = items.find((i) => i.productId === payload.productId);

  if (existing) {
    existing.quantity += payload.quantity;
  } else {
    items.push(payload);
  }

  return prisma.cart.update({
    where: { userId },
    data: { items: items as unknown as Prisma.InputJsonValue },
  });
};

const getCart = (userId: string) => {
  return prisma.cart.findUnique({ where: { userId } });
};

const removeItem = async (userId: string, productId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return null;

  let items = cart.items as unknown as ICartItem[];
  items = items.filter((item) => item.productId !== productId);

  return prisma.cart.update({
    where: { userId },
    data: { items: items as unknown as Prisma.InputJsonValue },
  });
};

const clearCart = (userId: string) => {
  return prisma.cart.update({
    where: { userId },
    data: { items: [] as Prisma.InputJsonValue },
  });
};

export const CartService = {
  addToCart,
  getCart,
  removeItem,
  clearCart,
};
