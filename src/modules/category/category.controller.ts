import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


export const CategoryController = {
create: catchAsync(async (req: Request, res: Response) => {
const result = await CategoryService.createCategory(req.body);
sendResponse(res, 201, true, "Category created", result);
}),


getAll: catchAsync(async (_req: any, res: any) => {
const result = await CategoryService.getCategories();
sendResponse(res, 200, true, "Categories fetched", result);
}),


getOne: catchAsync(async (req: { params: { id: any; }; }, res: any) => {
const result = await CategoryService.getSingleCategory(req.params.id);
sendResponse(res, 200, true, "Category fetched", result);
}),


update: catchAsync(async (req: { params: { id: any; }; body: any; }, res: any) => {
const result = await CategoryService.updateCategory(req.params.id, req.body);
sendResponse(res, 200, true, "Category updated", result);
}),


remove: catchAsync(async (req: { params: { id: any; }; }, res: any) => {
const result = await CategoryService.deleteCategory(req.params.id);
sendResponse(res, 200, true, "Category deleted", result);
}),
};