import { Request, Response } from "express";
import { stockLogService } from "./stockLog.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createStockLog = catchAsync(async (req: Request, res: Response) => {
  const result = await stockLogService.createStockLog(req.body);
  sendResponse(res, 201, true, "StockLog created successfully", result);
});

const getAllStockLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await stockLogService.getAllStockLogs();
  sendResponse(res, 200, true, "StockLogs fetched successfully", result);
});

export const stockLogController = {
  createStockLog,
  getAllStockLogs,
};
