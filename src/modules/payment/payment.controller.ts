import { Request, Response } from "express";
import { paymentService } from "./payment.service";


class PaymentController {
  // Initialize SSL Payment
  initSslPayment = async (req: Request, res: Response) => {
    const result = await paymentService.initSslPayment(req.body);
    res.json({
      success: true,
      message: "SSL Payment session created",
      data: result,
    });
  };

  // SSLCommerz IPN (Auto Payment Verification)
  sslIPN = async (req: Request, res: Response) => {
    const result = await paymentService.verifySslPayment(req.body);
    res.json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  };

  // Create Stripe Payment Intent
  createStripePayment = async (req: Request, res: Response) => {
    const { amount, orderId } = req.body;
    const result = await paymentService.createStripePayment(amount, orderId);

    res.json({
      success: true,
      message: "Stripe payment initialized",
      data: result,
    });
  };

  // Confirm Stripe Payment Success
  stripeSuccess = async (req: Request, res: Response) => {
    const { orderId, paymentId } = req.body;
    const result = await paymentService.stripeSuccess(orderId, paymentId);

    res.json({
      success: true,
      message: "Stripe payment successful",
      data: result,
    });
  };
}

export const paymentController = new PaymentController();
