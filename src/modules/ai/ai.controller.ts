import { Request, Response } from "express";
import { AIService } from "./ai.service";

const reviewCheck = async (req: Request, res: Response) => {
  const result = await AIService.analyzeReview(req.body.comment);

  res.status(200).json({
    success: true,
    data: result,
  });
};

const chat = async (req: Request, res: Response) => {
  const reply = await AIService.chatSupport(req.body.message);

  res.status(200).json({
    success: true,
    reply,
  });
};

const couponSuggestion = async (req: Request, res: Response) => {
  const code = await AIService.suggestCoupon(req.body.cartTotal);

  res.status(200).json({
    success: true,
    coupon: code,
  });
};

export const AIController = {
  reviewCheck,
  chat,
  couponSuggestion,
};
