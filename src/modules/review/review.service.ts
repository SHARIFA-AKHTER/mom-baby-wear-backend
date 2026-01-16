import { Prisma } from "@prisma/client";
import { prisma } from "../../app/shared/prisma";
import { paginationHelper } from "../../utils/paginationHelper";


const createReview = async (userId: string, payload: any)=> {
    const { productId, rating, comment } = payload;

    // Prevent multiple reviews by the same user
    const existing = await prisma.review.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      throw new Error("You already reviewed this product.");
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment,
      },
    });

    return review;
  }


  const getProductReviews = (productId: string) =>{
    return prisma.review.findMany({
      where: { productId, approved: true },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

const getAllReviews = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { comment: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({ [field]: value })),
    });
  }

  const whereConditions: Prisma.ReviewWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
    where: whereConditions,
    include: { user: true, product: true },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.review.count({ where: whereConditions });
  return { meta: { page, limit, total }, result };
};

const approveReview = (id: string) =>{
    return prisma.review.update({
      where: { id },
      data: { approved: true },
    });
  }


  const deleteReview = (id: string)=> {
    return prisma.review.delete({
      where: { id },
    });
  }


export const reviewService = {
createReview,
getProductReviews,
getAllReviews,
approveReview,
deleteReview
}
