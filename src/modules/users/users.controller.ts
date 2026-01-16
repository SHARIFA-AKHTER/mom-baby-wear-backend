import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { usersService } from "./users.service";
import { uploadToCloudinary } from "../../middleware/uploadImage";
import pick from "../../utils/pick";


const createUser = catchAsync(async (req: any, res: Response) => {
  
  if (req.file) {
    const uploadedUrl = await uploadToCloudinary(req.file);
    req.body.profileImage = uploadedUrl;
  }

  const result = await usersService.createUser(req.body);
  console.log("BODY:", req.body);
console.log("FILE:", req.file);

  sendResponse(res, 201, true, "User created successfully", result);
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, ["searchTerm", "role", "status"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const dataWithMeta = await usersService.getAllUsers(filters, options);


  return sendResponse(
    res,
    200,
    true,
    "Users fetched successfully",
    dataWithMeta
  );
});

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
function uploadImage(path: any) {
  throw new Error("Function not implemented.");
}

