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

const get = async (userId: string) => {
    const wishlist = await prisma.wishlist.findUnique({ where: { userId } });
    
    if (!wishlist || !wishlist.items) {
        return [];
    }

    const productIds = wishlist.items as string[];

  
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });

    return products;
};
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
