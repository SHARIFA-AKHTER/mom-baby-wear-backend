import express from "express";
import { userRoutes } from "../../modules/users/users.route";
import { authRoutes } from "../../modules/auth/auth.route";
import { CategoryRoutes } from "../../modules/category/category.route";
import { OrderRoutes } from "../../modules/order/order.route";
import { productRoutes } from "../../modules/products/product.route";
import { ReviewRoutes } from "../../modules/review/review.route";
import { PaymentRoutes } from "../../modules/payment/payment.route";
import { couponRoutes } from "../../modules/coupon/coupon.routes";
import { CartRoutes } from "../../modules/cart/cart.routes";
import { InventoryRoutes } from "../../modules/inventory/inventory.routes";
import { DashboardRoutes } from "../../modules/dashboard/dashboard.routes";
import { AdminSettingsRoutes } from "../../modules/adminSettings/adminSettings.routes";
import { WishlistRoutes } from "../../modules/wishlist/wishlist.routes";
import { stockLogRoutes } from "../../modules/stockLog/stockLog.routes";
import { AIRoutes } from "../../modules/ai/ai.routes";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send({ status: "OK" });
// });

const moduleRoutes = [
 {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
  {
    path: "/coupon",
    route: couponRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/inventory",
    route: InventoryRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
  {
    path: "/adminSettings",
    route:  AdminSettingsRoutes,
  },
  {
    path: "/wishlist",
    route:  WishlistRoutes,
  },
  {
    path: "/stockLog",
    route:  stockLogRoutes,
  },
  {
    path: "/ai",
    route:   AIRoutes,
  },

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;