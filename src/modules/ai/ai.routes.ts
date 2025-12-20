import express from "express";
import { AIController } from "./ai.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  aiReviewValidation,
  aiChatValidation,
  aiCouponValidation,
} from "./ai.validation";

const router = express.Router();

router.post(
  "/review",
  validateRequest(aiReviewValidation),
  AIController.reviewCheck
);

router.post(
  "/chat",
  validateRequest(aiChatValidation),
  AIController.chat
);

router.post(
  "/coupon",
  validateRequest(aiCouponValidation),
  AIController.couponSuggestion
);

export const AIRoutes = router;
