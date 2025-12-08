import { Request, Response } from 'express';
import { reviewService } from './review.service';



 const createReview = async (req: Request, res: Response) => {
    const userId = req.user?.id!;
    const result = await reviewService.createReview(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: result,
    });
  }

 const getProductReviews = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const result = await reviewService.getProductReviews(productId);

    res.json({
      success: true,
      message: "Product reviews fetched",
      data: result,
    });
  }


  const getAllReviews = async (req: Request, res: Response) => {
    const result = await reviewService.getAllReviews();

    res.json({
      success: true,
      message: "All reviews retrieved",
      data: result,
    });
  }


  const approveReview = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await reviewService.approveReview(id);

    res.json({
      success: true,
      message: "Review approved successfully",
      data: result,
    });
  }


  const deleteReview = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await reviewService.deleteReview(id);

    res.json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  };


export const reviewController ={
createReview,
getProductReviews,
getAllReviews,
approveReview,
deleteReview
} 
