import express from "express";
import { userRoutes } from "../../modules/users/users.route";
import { authRoutes } from "../../modules/auth/auth.route";
import { CategoryRoutes } from "../../modules/category/category.route";
import { OrderRoutes } from "../../modules/order/order.route";
import { productRoutes } from "../../modules/products/product.route";
import { ReviewRoutes } from "../../modules/review/review.route";

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

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;