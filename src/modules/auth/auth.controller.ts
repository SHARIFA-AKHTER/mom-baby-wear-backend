import { Request, Response } from 'express';
import * as authService from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  return sendResponse(res, 201, true, "Registered successfully", result);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  return sendResponse(res, 200, true, "Login success", result);
});