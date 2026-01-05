"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const ai_service_1 = require("./ai.service");
const reviewCheck = async (req, res) => {
    const result = await ai_service_1.AIService.analyzeReview(req.body.comment);
    res.status(200).json({
        success: true,
        data: result,
    });
};
const chat = async (req, res) => {
    const reply = await ai_service_1.AIService.chatSupport(req.body.message);
    res.status(200).json({
        success: true,
        reply,
    });
};
const couponSuggestion = async (req, res) => {
    const code = await ai_service_1.AIService.suggestCoupon(req.body.cartTotal);
    res.status(200).json({
        success: true,
        coupon: code,
    });
};
exports.AIController = {
    reviewCheck,
    chat,
    couponSuggestion,
};
