"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const bannedWords = ["fake", "bad", "worst", "scam"];
const analyzeReview = async (comment) => {
    const suspicious = bannedWords.some(word => comment.toLowerCase().includes(word));
    const result = {
        approved: !suspicious,
        confidence: suspicious ? 0.4 : 0.9,
        reason: suspicious ? "Suspicious language detected" : "Clean review",
    };
    // Save AI log
    await prisma_1.prisma.aILog.create({
        data: {
            type: "REVIEW",
            input: comment,
            output: JSON.stringify(result),
            confidence: result.confidence,
        },
    });
    return result;
};
const chatSupport = async (message) => {
    let reply = "Please contact customer support.";
    if (message.toLowerCase().includes("delivery"))
        reply = "Delivery charge is 120 taka all over Bangladesh.";
    else if (message.toLowerCase().includes("refund"))
        reply = "Refund available within 7 days.";
    else if (message.toLowerCase().includes("size"))
        reply = "Size chart is available on product details page.";
    await prisma_1.prisma.aILog.create({
        data: {
            type: "CHAT",
            input: message,
            output: reply,
        },
    });
    return reply;
};
const suggestCoupon = async (cartTotal) => {
    let code = null;
    if (cartTotal >= 3000)
        code = "MEGA300";
    else if (cartTotal >= 1500)
        code = "SAVE150";
    await prisma_1.prisma.aILog.create({
        data: {
            type: "COUPON",
            input: cartTotal.toString(),
            output: code ?? "NO_COUPON",
        },
    });
    return code;
};
exports.AIService = {
    analyzeReview,
    chatSupport,
    suggestCoupon,
};
