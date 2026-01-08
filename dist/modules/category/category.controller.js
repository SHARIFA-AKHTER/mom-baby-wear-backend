"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const ApiError_1 = require("../../utils/ApiError");
const createCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await category_service_1.CategoryService.createCategory(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Category created", result);
});
const getAllCategory = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await category_service_1.CategoryService.getCategories();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Categories fetched", result);
});
const getOneCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await category_service_1.CategoryService.getSingleCategory(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Category fetched", result);
});
const updateCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await category_service_1.CategoryService.updateCategory(id, req.body);
    if (!result) {
        throw new ApiError_1.ApiError(404, "Category not found to update");
    }
    (0, sendResponse_1.sendResponse)(res, 200, true, "Category updated successfully", result);
});
const removeCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await category_service_1.CategoryService.deleteCategory(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Category deleted", result);
});
exports.CategoryController = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    removeCategory
};
