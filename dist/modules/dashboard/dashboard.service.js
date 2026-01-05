"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = require("../../app/shared/prisma");
const getStats = async () => {
    const totalUsers = await prisma_1.prisma.order.count();
    const totalOrders = await prisma_1.prisma.order.count();
    const totalRevenue = await prisma_1.prisma.order.aggregate({
        _sum: { total: true },
    });
    const totalProducts = await prisma_1.prisma.product.count();
    return {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalProducts,
    };
};
// Monthly sales chart
const getMonthlySales = async () => {
    // Returns monthly revenue for last 12 months
    const result = await prisma_1.prisma.$queryRaw `
      SELECT
        TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
        SUM(total) AS revenue
      FROM "Order"
      WHERE "status" = 'DELIVERED'
      GROUP BY month
      ORDER BY month ASC
    `;
    return result;
};
// Low stock products
const getLowStockProducts = async () => {
    const lowStock = await prisma_1.prisma.inventory.findMany({
        where: { lowStock: true },
        include: { product: true },
    });
    return lowStock;
};
exports.DashboardService = {
    getStats,
    getMonthlySales,
    getLowStockProducts
};
