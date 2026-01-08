"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
// @ts-ignore
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const prisma_1 = require("../../app/shared/prisma");
const config_1 = __importDefault(require("../../config"));
const client_1 = require("@prisma/client");
const is_live = false;
const backend_url = config_1.default.env === "production"
    ? "https://mom-baby-wear-backend.vercel.app"
    : "http://localhost:5000";
class PaymentService {
    async initSslPayment(payload) {
        const data = {
            total_amount: Number(payload.amount),
            currency: "BDT",
            tran_id: payload.orderId,
            success_url: `${backend_url}/api/payments/ssl-success`,
            fail_url: `${backend_url}/api/payments/ssl-fail`,
            cancel_url: `${backend_url}/api/payments/ssl-cancel`,
            ipn_url: `${backend_url}/api/payments/ssl-ipn`,
            shipping_method: "NO",
            product_name: "Order Payment",
            product_category: "General",
            product_profile: "general",
            cus_name: payload.customerName || "Customer Name",
            cus_email: payload.customerEmail || "customer@mail.com",
            cus_phone: payload.customerPhone || "01711111111",
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1212",
            cus_country: "Bangladesh",
        };
        const sslcz = new sslcommerz_lts_1.default(config_1.default.ssl.store_id || "demo", config_1.default.ssl.store_pass || "demo", is_live);
        const response = await sslcz.init(data);
        if (response?.GatewayPageURL) {
            return response.GatewayPageURL;
        }
        else {
            throw new Error(response?.failedreason || "Failed to initialize SSLCommerz");
        }
    }
    // async verifySslPayment(payload: any) {
    //   const { tran_id, val_id, amount, status } = payload;
    //   if (status === "VALID") {
    //     const order = await prisma.order.update({
    //       where: { id: tran_id },
    //       data: {},
    //     });
    //     await prisma.payment.create({
    //       data: {
    //         orderId: tran_id,
    //         amount: parseFloat(amount),
    //         gateway: "SSLCommerz",
    //         transactionId: val_id,
    //         status: "SUCCESS",
    //       },
    //     });
    //     return order;
    //   }
    //   throw new Error("Payment is not valid");
    // }
    async verifySslPayment(payload) {
        const { tran_id, val_id, amount, status } = payload;
        if (status === "VALID") {
            return await prisma_1.prisma.$transaction(async (tx) => {
                await tx.order.update({
                    where: { id: tran_id },
                    data: {
                        status: client_1.OrderStatus.PROCESSING,
                    },
                });
                const paymentRecord = await tx.payment.create({
                    data: {
                        orderId: tran_id,
                        amount: Number(amount),
                        gateway: "SSLCommerz",
                        transactionId: val_id,
                        status: "SUCCESS",
                    },
                });
                return paymentRecord;
            });
        }
        throw new Error("Payment is not valid");
    }
}
exports.paymentService = new PaymentService();
