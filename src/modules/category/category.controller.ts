import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createCategory = catchAsync(async (req: Request, res: Response) => {
const result = await CategoryService.createCategory(req.body);
sendResponse(res, 201, true, "Category created", result);
})

const getAllCategory = catchAsync(async (_req: any, res: any) => {
const result = await CategoryService.getCategories();
sendResponse(res, 200, true, "Categories fetched", result);
})


const getOneCategory = catchAsync(async (req: { params: { id: any; }; }, res: any) => {
const result = await CategoryService.getSingleCategory(req.params.id);
sendResponse(res, 200, true, "Category fetched", result);
})


const updateCategory  = catchAsync(async (req: { params: { id: any; }; body: any; }, res: any) => {
const result = await CategoryService.updateCategory(req.params.id, req.body);
sendResponse(res, 200, true, "Category updated", result);
})


const removeCategory = catchAsync(async (req: { params: { id: any; }; }, res: any) => {
const result = await CategoryService.deleteCategory(req.params.id);
sendResponse(res, 200, true, "Category deleted", result);
})
export const CategoryController = {
createCategory,
getAllCategory,
getOneCategory,
updateCategory,
removeCategory

};


