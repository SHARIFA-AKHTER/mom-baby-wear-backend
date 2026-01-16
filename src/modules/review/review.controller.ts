import { Request, Response } from 'express';
import { reviewService } from './review.service';
import { catchAsync } from '../../utils/catchAsync';
import pick from '../../utils/pick';
import { sendResponse } from '../../utils/sendResponse';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id!;
  const result = await reviewService.createReview(userId, req.body);
  
  sendResponse(res, 201, true, "Review submitted successfully", result);
});

const getProductReviews = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await reviewService.getProductReviews(productId);

  sendResponse(res, 200, true, "Product reviews fetched successfully", result);
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", "rating", "productId"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  
  const result = await reviewService.getAllReviews(filters, options);

  sendResponse(res, 200, true, "Reviews fetched successfully", result);
});

const approveReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.approveReview(id);

  sendResponse(res, 200, true, "Review approved successfully", result);
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.deleteReview(id);

  sendResponse(res, 200, true, "Review deleted successfully", result);
});

export const reviewController = {
  createReview,
  getProductReviews,
  getAllReviews,
  approveReview,
  deleteReview,
};
