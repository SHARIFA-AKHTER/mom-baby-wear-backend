"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../../modules/users/users.route");
const auth_route_1 = require("../../modules/auth/auth.route");
const category_route_1 = require("../../modules/category/category.route");
const order_route_1 = require("../../modules/order/order.route");
const product_route_1 = require("../../modules/products/product.route");
const review_route_1 = require("../../modules/review/review.route");
const payment_route_1 = require("../../modules/payment/payment.route");
const coupon_routes_1 = require("../../modules/coupon/coupon.routes");
const cart_routes_1 = require("../../modules/cart/cart.routes");
const inventory_routes_1 = require("../../modules/inventory/inventory.routes");
const dashboard_routes_1 = require("../../modules/dashboard/dashboard.routes");
const adminSettings_routes_1 = require("../../modules/adminSettings/adminSettings.routes");
const wishlist_routes_1 = require("../../modules/wishlist/wishlist.routes");
const stockLog_routes_1 = require("../../modules/stockLog/stockLog.routes");
const ai_routes_1 = require("../../modules/ai/ai.routes");
const contact_routes_1 = require("../../modules/contact/contact.routes");
const router = express_1.default.Router();
// router.get("/", (req, res) => {
//   res.send({ status: "OK" });
// });
const moduleRoutes = [
    {
        path: "/user",
        route: users_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/category",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/order",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/product",
        route: product_route_1.productRoutes,
    },
    {
        path: "/review",
        route: review_route_1.ReviewRoutes,
    },
    {
        path: "/payments",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/coupon",
        route: coupon_routes_1.couponRoutes,
    },
    {
        path: "/cart",
        route: cart_routes_1.CartRoutes,
    },
    {
        path: "/inventory",
        route: inventory_routes_1.InventoryRoutes,
    },
    {
        path: "/dashboard",
        route: dashboard_routes_1.DashboardRoutes,
    },
    {
        path: "/adminSettings",
        route: adminSettings_routes_1.AdminSettingsRoutes,
    },
    {
        path: "/wishlist",
        route: wishlist_routes_1.WishlistRoutes,
    },
    {
        path: "/stockLog",
        route: stockLog_routes_1.stockLogRoutes,
    },
    {
        path: "/ai",
        route: ai_routes_1.AIRoutes,
    },
    {
        path: "/contact",
        route: contact_routes_1.ContactRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
