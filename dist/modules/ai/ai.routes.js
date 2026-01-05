"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("./ai.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const ai_validation_1 = require("./ai.validation");
const router = express_1.default.Router();
router.post("/review", (0, validateRequest_1.validateRequest)(ai_validation_1.aiReviewValidation), ai_controller_1.AIController.reviewCheck);
router.post("/chat", (0, validateRequest_1.validateRequest)(ai_validation_1.aiChatValidation), ai_controller_1.AIController.chat);
router.post("/coupon", (0, validateRequest_1.validateRequest)(ai_validation_1.aiCouponValidation), ai_controller_1.AIController.couponSuggestion);
exports.AIRoutes = router;
