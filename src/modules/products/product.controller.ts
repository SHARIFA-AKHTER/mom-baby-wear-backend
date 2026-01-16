import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IProduct } from "./product.interface";
import { productService } from "./product.service";
import pick from "../../utils/pick";
 
 const createProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.createProduct(req.body as IProduct);

    return sendResponse(res, 201, true, "Product created successfully", result);
  })

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'categoryId']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const dataWithMeta = await productService.getProducts(filters, options);

  return sendResponse(
    res, 
    200, 
    true, 
    "Products fetched successfully", 
    dataWithMeta 
  );
});

 const getProductById = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.getProductById(req.params.id);

    return sendResponse(res, 200, true, "Product fetched", result);
  })

  const updateProduct =  catchAsync(async (req: Request, res: Response) => {
    const result = await productService.updateProduct(req.params.id, req.body);

    return sendResponse(res, 200, true, "Product updated", result);
  })

  const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.deleteProduct(req.params.id);

    return sendResponse(res, 200, true, "Product deleted", result);
  })
export const productController = {
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct

};
