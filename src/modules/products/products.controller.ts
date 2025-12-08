
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { productService } from "./products.service";



export const productController = {
createProduct: catchAsync(async (req: { body: any; }, res: any) => {
const result = await productService.createProduct(req.body);
sendResponse(res, {
success: true,
statusCode: 201,
message: "Product created successfully",
data: result,
});
}),


getProducts: catchAsync(async (req: any, res: any) => {
const result = await productService.getProducts();
sendResponse(res, {
success: true,
statusCode: 200,
message: "Products fetched",
data: result,
});
}),


getProductById: catchAsync(async (req: { params: { id: any; }; }, res: any) => {
const result = await productService.getProductById(req.params.id);
sendResponse(res, {
success: true,
statusCode: 200,
message: "Product fetched",
data: result,
});
}),


updateProduct: catchAsync(async (req: { params: { id: any; }; body: any; }, res: any) => {
const result = await productService.updateProduct(req.params.id, req.body);
sendResponse(res, {
success: true,
statusCode: 200,
message: "Product updated",
data: result,
});
}),


deleteProduct: catchAsync(async (req: { params: { id: any; }; }, res: any) => {
const result = await productService.deleteProduct(req.params.id);
sendResponse(res, {
success: true,
statusCode: 200,
message: "Product deleted",
data: result,
});
}),
};