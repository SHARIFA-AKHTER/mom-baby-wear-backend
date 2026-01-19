"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const catchAsync_1 = require("../../utils/catchAsync");
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = require("../../utils/sendResponse");
const createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.id;
    const result = await review_service_1.reviewService.createReview(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Review submitted successfully", result);
});
const getProductReviews = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { productId } = req.params;
    const result = await review_service_1.reviewService.getProductReviews(productId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Product reviews fetched successfully", result);
});
const getAllReviews = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, ["searchTerm", "rating", "productId"]);
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await review_service_1.reviewService.getAllReviews(filters, options);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Reviews fetched successfully", result);
});
const approveReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await review_service_1.reviewService.approveReview(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Review approved successfully", result);
});
const deleteReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await review_service_1.reviewService.deleteReview(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Review deleted successfully", result);
});
const getPublicStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await review_service_1.reviewService.getPublicStats();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Public statistics fetched successfully", result);
});
exports.reviewController = {
    createReview,
    getProductReviews,
    getAllReviews,
    approveReview,
    deleteReview,
    getPublicStats
};
