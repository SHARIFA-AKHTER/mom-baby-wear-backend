"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const router = express_1.default.Router();
// User create review (only CUSTOMER)
router.post('/', auth_1.authenticate, (0, auth_1.authorizeRoles)('CUSTOMER'), (0, validateRequest_1.validateRequest)(review_validation_1.createReviewValidation), review_controller_1.reviewController.createReview);
// Get product reviews (public)
router.get('/product/:productId', review_controller_1.reviewController.getProductReviews);
// Admin & Manager - get all reviews
router.get('/', auth_1.authenticate, (0, authorize_1.default)('ADMIN', 'MANAGER'), review_controller_1.reviewController.getAllReviews);
router.get('/public-stats', review_controller_1.reviewController.getPublicStats);
// Approve review (Admin/Manager only)
router.patch('/approve/:id', 
// authenticate,
// authorize('ADMIN', 'MANAGER'),
review_controller_1.reviewController.approveReview);
// Delete review (Admin/Manager only)
router.delete('/:id', 
// authenticate,
// authorize('ADMIN', 'MANAGER'),
review_controller_1.reviewController.deleteReview);
exports.ReviewRoutes = router;
