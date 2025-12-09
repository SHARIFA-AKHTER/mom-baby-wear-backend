
import { catchAsync } from "../../utils/catchAsync";
import { DashboardService } from "./dashboard.service";

export const DashboardController = {
  getStats: catchAsync(async (req: any, res: { json: (arg0: { success: boolean; data: { totalUsers: any; totalOrders: any; totalRevenue: number; totalProducts: number; }; }) => void; }) => {
    const data = await DashboardService.getStats();
    res.json({ success: true, data });
  }),

  getMonthlySales: catchAsync(async (req: any, res: { json: (arg0: { success: boolean; data: unknown; }) => void; }) => {
    const data = await DashboardService.getMonthlySales();
    res.json({ success: true, data });
  }),

  getLowStock: catchAsync(async (req: any, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const data = await DashboardService.getLowStockProducts();
    res.json({ success: true, data });
  }),
};
