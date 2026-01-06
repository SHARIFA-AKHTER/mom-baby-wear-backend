import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ApiError } from "../../utils/ApiError";


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


const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.updateCategory(id, req.body);

  if (!result) {
    throw new ApiError(404, "Category not found to update");
  }

  sendResponse(res, 200, true, "Category updated successfully", result);
});


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


