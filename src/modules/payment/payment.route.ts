import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

// SSLCommerz routes
router.post("/ssl-init", paymentController.initSslPayment);
router.post("/ssl-ipn", paymentController.sslIPN);

// Stripe routes
router.post("/stripe-init", paymentController.createStripePayment);
router.post("/stripe-success", paymentController.stripeSuccess);

export const PaymentRoutes = router;
