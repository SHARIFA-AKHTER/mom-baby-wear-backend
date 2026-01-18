import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DashboardService } from "./dashboard.service";
import { sendResponse } from "../../utils/sendResponse";

const getStats = catchAsync(async (req: Request, res: Response) => {
  const data = await DashboardService.getStats();
  sendResponse(res, 200, true, "Dashboard stats retrieved", data);
});

const getMonthlySales = catchAsync(async (req: Request, res: Response) => {
  const data = await DashboardService.getMonthlySales();
  sendResponse(res, 200, true, "Monthly sales retrieved", data);
});

const getLowStock = catchAsync(async (req: Request, res: Response) => {
  const data = await DashboardService.getLowStockProducts();
  sendResponse(res, 200, true, "Low stock products retrieved", data);
});

const getRecentOrders = catchAsync(async (req: Request, res: Response) => {
  const data = await DashboardService.getRecentOrders();
  sendResponse(res, 200, true, "Recent orders fetched", data);
});

export const DashboardController = {
  getStats,
  getMonthlySales,
  getLowStock,
  getRecentOrders
};