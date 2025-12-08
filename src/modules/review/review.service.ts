import { prisma } from "../../app/shared/prisma";


class ReviewService {
  // Create Review
  async createReview(userId: string, payload: any) {
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

  // Get product reviews
  async getProductReviews(productId: string) {
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

  // Admin: Get all reviews
  async getAllReviews() {
    return prisma.review.findMany({
      include: {
        user: true,
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Approve review (Admin)
  async approveReview(id: string) {
    return prisma.review.update({
      where: { id },
      data: { approved: true },
    });
  }

  // Delete a review
  async deleteReview(id: string) {
    return prisma.review.delete({
      where: { id },
    });
  }
}

export const reviewService = new ReviewService();
