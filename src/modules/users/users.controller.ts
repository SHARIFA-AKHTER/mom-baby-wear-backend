
import { Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./users.interface";
import { usersService } from "./users.service";


export const usersController = {
createUser: catchAsync(async (req: { body: IUser; }, res: Response<any, Record<string, any>>) => {
const result = await usersService.createUser(req.body);
sendResponse(res, {
success: true,
statusCode: 201,
message: "User created successfully",
data: result,
});
}),


getAllUsers: catchAsync(async (_req: any, res: Response<any, Record<string, any>>) => {
const result = await usersService.getAllUsers();
sendResponse(res, {
success: true,
statusCode: 200,
message: "Users fetched successfully",
data: result,
});
}),


getSingleUser: catchAsync(async (req: { params: { id: string; }; }, res: Response<any, Record<string, any>>) => {
const result = await usersService.getSingleUser(req.params.id);
sendResponse(res, {
success: true,
statusCode: 200,
message: "User fetched successfully",
data: result,
});
}),


deleteUser: catchAsync(async (req: { params: { id: string; }; }, res: Response<any, Record<string, any>>) => {
const result = await usersService.deleteUser(req.params.id);
sendResponse(res, {
success: true,
statusCode: 200,
message: "User deleted successfully",
data: result,
});
}),
};