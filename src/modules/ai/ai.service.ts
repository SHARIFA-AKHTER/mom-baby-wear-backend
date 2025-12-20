
import { prisma } from "../../app/shared/prisma";
import { AIReviewResult } from "./ai.interface";


const bannedWords = ["fake", "bad", "worst", "scam"];

const analyzeReview = async (comment: string): Promise<AIReviewResult> => {
  const suspicious = bannedWords.some(word =>
    comment.toLowerCase().includes(word)
  );

  const result: AIReviewResult = {
    approved: !suspicious,
    confidence: suspicious ? 0.4 : 0.9,
    reason: suspicious ? "Suspicious language detected" : "Clean review",
  };

  // Save AI log
  await prisma.aILog.create({
    data: {
      type: "REVIEW",
      input: comment,
      output: JSON.stringify(result),
      confidence: result.confidence,
    },
  });

  return result;
};

const chatSupport = async (message: string) => {
  let reply = "Please contact customer support.";

  if (message.toLowerCase().includes("delivery"))
    reply = "Delivery charge is 120 taka all over Bangladesh.";
  else if (message.toLowerCase().includes("refund"))
    reply = "Refund available within 7 days.";
  else if (message.toLowerCase().includes("size"))
    reply = "Size chart is available on product details page.";

  await prisma.aILog.create({
    data: {
      type: "CHAT",
      input: message,
      output: reply,
    },
  });

  return reply;
};

const suggestCoupon = async (cartTotal: number) => {
  let code = null;

  if (cartTotal >= 3000) code = "MEGA300";
  else if (cartTotal >= 1500) code = "SAVE150";

  await prisma.aILog.create({
    data: {
      type: "COUPON",
      input: cartTotal.toString(),
      output: code ?? "NO_COUPON",
    },
  });

  return code;
};

export const AIService = {
  analyzeReview,
  chatSupport,
  suggestCoupon,
};
