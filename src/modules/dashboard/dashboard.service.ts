import { prisma } from "../../app/shared/prisma";



 const getStats = async () =>{
    const totalUsers = await prisma.order.count();
     const totalOrders = await prisma.order.count(); 
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
    });
    const totalProducts = await prisma.product.count();

    return {
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
    };
  }

  // Monthly sales chart
 const getMonthlySales = async () =>{
    // Returns monthly revenue for last 12 months
    const result = await prisma.$queryRaw`
      SELECT
        TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
        SUM(total) AS revenue
      FROM "Order"
      WHERE "status" = 'DELIVERED'
      GROUP BY month
      ORDER BY month ASC
    `;
    return result;
  }

  // Low stock products
 const getLowStockProducts = async () =>{
    const lowStock = await prisma.inventory.findMany({
      where: { lowStock: true },
      include: { product: true },
    });
    return lowStock;
  }
  export const DashboardService = {
getStats,
getMonthlySales,
getLowStockProducts
};
