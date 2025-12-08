import { Request, Response } from 'express';
import * as service from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';


export const register = catchAsync(async (req: Request, res: Response) => {
const { user, token } = await service.registerUser(req.body);
sendResponse(res, { user, token }, 'Registered', 201);
});


export const login = catchAsync(async (req: Request, res: Response) => {
const { user, token } = await service.loginUser(req.body);
sendResponse(res, { user, token }, 'Login success');
});