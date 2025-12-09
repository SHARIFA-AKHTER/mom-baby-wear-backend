import { prisma } from "../../app/shared/prisma";

 const add = async (userId: string, productId: string)=> {
    let wishlist = await prisma.wishlist.findUnique({ where: { userId } });

    if (!wishlist) {
      return prisma.wishlist.create({
        data: {
          userId,
          items: [productId],
        },
      });
    }

    const items = wishlist.items as string[];

    if (!items.includes(productId)) items.push(productId);

    return prisma.wishlist.update({
      where: { userId },
      data: { items },
    });
  }

const get = (userId: string) =>{
    return prisma.wishlist.findUnique({ where: { userId } });
  }

const remove = async (userId: string, productId: string) =>{
    let wishlist = await prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist) return null;

    const items = (wishlist.items as string[]).filter((id) => id !== productId);

    return prisma.wishlist.update({
      where: { userId },
      data: { items },
    });
  }
export const WishlistService = {
add,
get,
remove
};
