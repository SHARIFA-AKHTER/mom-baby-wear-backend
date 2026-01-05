"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_validation_1 = require("./product.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/create", (0, validateRequest_1.validateRequest)(product_validation_1.createProductSchema), product_controller_1.productController.createProduct);
router.get("/", product_controller_1.productController.getProducts);
router.get("/:id", product_controller_1.productController.getProductById);
router.patch("/:id", product_controller_1.productController.updateProduct);
router.delete("/:id", product_controller_1.productController.deleteProduct);
exports.productRoutes = router;
