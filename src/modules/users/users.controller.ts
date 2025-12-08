import { Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./users.interface";
import { usersService } from "./users.service";


 const createUser = catchAsync(async (req: { body: IUser }, res: Response) => {
    const result = await usersService.createUser(req.body);

    sendResponse(res, 201, true, "User created successfully", result);
  })

  const getAllUsers = catchAsync(async (_req: any, res: Response) => {
    const result = await usersService.getAllUsers();

    sendResponse(res, 200, true, "Users fetched successfully", result);
  })

  const getSingleUser = catchAsync(async (req: { params: { id: string } }, res: Response) => {
    const result = await usersService.getSingleUser(req.params.id);

    sendResponse(res, 200, true, "User fetched successfully", result);
  })

  const deleteUser = catchAsync(async (req: { params: { id: string } }, res: Response) => {
    const result = await usersService.deleteUser(req.params.id);

    sendResponse(res, 200, true, "User deleted successfully", result);
  })

export const usersController = {
createUser,
getAllUsers,
getSingleUser,
deleteUser
};
