export type AIReviewResult = {
  approved: boolean;
  confidence: number;
  reason: string;
};

export type AIChatResult = {
  reply: string;
};

export type AICouponResult = {
  code: string | null;
};
