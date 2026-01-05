"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const wishlist_validation_1 = require("./wishlist.validation");
const router = express_1.default.Router();
router.post("/add", auth_1.authenticate, (0, auth_1.authorizeRoles)("CUSTOMER"), (0, validateRequest_1.validateRequest)(wishlist_validation_1.addToWishlistValidation), wishlist_controller_1.WishlistController.add);
router.get("/", auth_1.authenticate, wishlist_controller_1.WishlistController.get);
router.delete("/remove/:productId", auth_1.authenticate, (0, auth_1.authorizeRoles)("CUSTOMER"), wishlist_controller_1.WishlistController.remove);
exports.WishlistRoutes = router;
