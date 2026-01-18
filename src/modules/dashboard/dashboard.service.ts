import { prisma } from "../../app/shared/prisma";

const getStats = async () => {

  const totalUsers = await prisma.user.count();
  const totalOrders = await prisma.order.count();
  const totalProducts = await prisma.product.count();
  

  const totalRevenue = await prisma.order.aggregate({
    where: { status: 'DELIVERED' },
    _sum: { total: true },
  });

  return {
    totalUsers,
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    totalProducts,
  };
};

const getMonthlySales = async () => {

  const result = await prisma.$queryRaw`
    SELECT 
      TO_CHAR("createdAt", 'Mon YYYY') AS month,
      SUM(total) AS revenue
    FROM "Order"
    WHERE "status" = 'DELIVERED'
    GROUP BY month, DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt") ASC
    LIMIT 12
  `;
  return result;
};

const getLowStockProducts = async () => {
  return await prisma.inventory.findMany({
    where: { 
        quantity: { 
        lt: 10 
      }
    },
    include: { product: true },
  });
};

const getRecentOrders = async () => {
  return await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });
};

export const DashboardService = {
  getStats,
  getMonthlySales,
  getLowStockProducts,
  getRecentOrders
};