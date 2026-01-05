"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await product_service_1.productService.createProduct(req.body);
    return (0, sendResponse_1.sendResponse)(res, 201, true, "Product created successfully", result);
});
const getProducts = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await product_service_1.productService.getProducts();
    return (0, sendResponse_1.sendResponse)(res, 200, true, "Products fetched", result);
});
const getProductById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await product_service_1.productService.getProductById(req.params.id);
    return (0, sendResponse_1.sendResponse)(res, 200, true, "Product fetched", result);
});
const updateProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await product_service_1.productService.updateProduct(req.params.id, req.body);
    return (0, sendResponse_1.sendResponse)(res, 200, true, "Product updated", result);
});
const deleteProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await product_service_1.productService.deleteProduct(req.params.id);
    return (0, sendResponse_1.sendResponse)(res, 200, true, "Product deleted", result);
});
exports.productController = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
