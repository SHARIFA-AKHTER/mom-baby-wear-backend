
import SSLCommerzPayment from "sslcommerz-lts";
import Stripe from "stripe";
import { prisma } from "../../app/shared/prisma";

const store_id = process.env.SSL_STORE_ID!;
const store_passwd = process.env.SSL_STORE_PASS!;
const is_live = false; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

class PaymentService {
  // -------------------------------
  // 🔵 1. INIT PAYMENT (SSLCommerz)
  // -------------------------------
  async initSslPayment(payload: { amount: number; orderId: string }) {
    const data = {
      total_amount: payload.amount,
      currency: "BDT",
      tran_id: payload.orderId,
      success_url: `${process.env.BACKEND_URL}/api/payments/ssl-success`,
      fail_url: `${process.env.BACKEND_URL}/api/payments/ssl-fail`,
      cancel_url: `${process.env.BACKEND_URL}/api/payments/ssl-cancel`,
      ipn_url: `${process.env.BACKEND_URL}/api/payments/ssl-ipn`,
      product_name: "Order Payment",
      product_category: "Mom & Baby Wear",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    return await sslcz.init(data);
  }

  // -----------------------------------
  // 🔵 2. VERIFY PAYMENT (SSLCommerz IPN)
  // -----------------------------------
  async verifySslPayment(payload: any) {
    const { tran_id, val_id, amount } = payload;

    const order = await prisma.order.update({
      where: { id: tran_id },
      data: {
        status: "PROCESSING",
      },
    });

    await prisma.payment.create({
      data: {
        orderId: tran_id,
        amount,
        gateway: "SSLCommerz",
        transactionId: val_id,
        status: "SUCCESS",
      },
    });

    return order;
  }

  // -------------------------
  // 🔵 3. STRIPE Payment
  // -------------------------
  async createStripePayment(amount: number, orderId: string) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "usd",
      metadata: { orderId },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  async stripeSuccess(orderId: string, paymentId: string) {
    return await prisma.payment.create({
      data: {
        orderId,
        transactionId: paymentId,
        status: "SUCCESS",
        amount: 0,
        gateway: "STRIPE",
      },
    });
  }
}

export const paymentService = new PaymentService();
