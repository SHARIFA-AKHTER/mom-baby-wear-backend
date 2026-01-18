import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { newsletterService } from './newsletter.service';

const subscribe = catchAsync(async (req: Request, res: Response) => {
  const result = await newsletterService.subscribe(req.body);
  sendResponse(res, 201, true, "Subscribed successfully!", result);
});

const getAllSubscribers = catchAsync(async (req: Request, res: Response) => {
  const result = await newsletterService.getAllSubscribers();
  sendResponse(res, 200, true, "Subscribers fetched successfully", result);
});

export const newsletterController = {
  subscribe,
  getAllSubscribers
};