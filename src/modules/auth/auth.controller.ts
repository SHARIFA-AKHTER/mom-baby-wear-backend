
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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

export const AuthController = {
  register,
  login,
  refreshToken,
  changePassword,
};
