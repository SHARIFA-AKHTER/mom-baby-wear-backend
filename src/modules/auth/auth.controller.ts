
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  res.cookie("accessToken", result.token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(
    res,
    200,
    true,
    "Registered successfully",
    { needPasswordChange: result.user.needPasswordChange }
  );
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  res.cookie("accessToken", result.accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60,
  });

  res.cookie("refreshToken", result.refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 90,
  });

  sendResponse(
    res,
    200,
    true,
    "Login successful",
    { needPasswordChange: result.needPasswordChange }
  );
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  const result = await AuthService.refreshToken(token);

  res.cookie("accessToken", result.accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60,
  });

  sendResponse(
    res,
    200,
    true,
    "Access token refreshed successfully",
    result
  );
});

const changePassword = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const result = await AuthService.changePassword(req.user, req.body);

  sendResponse(
    res,
    200,
    true,
    "Password changed",
    result
  );
});

// const getMe = catchAsync(async (req: Request, res: Response) => {
//   const userSession = req.cookies;
//   const result = await AuthService.getMe(userSession);
//   sendResponse(
//     res,
//     httpStatus.OK,
//     true,
//     "User retrieved successfully!",
//     result
//   );
// });

const getMe = catchAsync(async (req: Request, res: Response) => {
  // Get token from cookies
  const token = req.cookies?.accessToken;
  if (!token) {
    return sendResponse(res, httpStatus.UNAUTHORIZED, false, "Not logged in", null);
  }

  const user = await AuthService.getMe(token);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    "User retrieved successfully!",
    user
  );
});
const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.authWithGoogle(req.body);

  res.cookie("accessToken", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(res, 200, true, result.message, result.user);
});
export const AuthController = {
  register,
  login,
  refreshToken,
  changePassword,
  getMe,
 googleLogin
};
