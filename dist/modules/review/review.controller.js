"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const createReview = async (req, res) => {
    const userId = req.user?.id;
    const result = await review_service_1.reviewService.createReview(userId, req.body);
    res.status(201).json({
        success: true,
        message: "Review submitted successfully",
        data: result,
    });
};
const getProductReviews = async (req, res) => {
    const { productId } = req.params;
    const result = await review_service_1.reviewService.getProductReviews(productId);
    res.json({
        success: true,
        message: "Product reviews fetched",
        data: result,
    });
};
const getAllReviews = async (req, res) => {
    const result = await review_service_1.reviewService.getAllReviews();
    res.json({
        success: true,
        message: "All reviews retrieved",
        data: result,
    });
};
const approveReview = async (req, res) => {
    const { id } = req.params;
    const result = await review_service_1.reviewService.approveReview(id);
    res.json({
        success: true,
        message: "Review approved successfully",
        data: result,
    });
};
const deleteReview = async (req, res) => {
    const { id } = req.params;
    const result = await review_service_1.reviewService.deleteReview(id);
    res.json({
        success: true,
        message: "Review deleted successfully",
        data: result,
    });
};
exports.reviewController = {
    createReview,
    getProductReviews,
    getAllReviews,
    approveReview,
    deleteReview
};
