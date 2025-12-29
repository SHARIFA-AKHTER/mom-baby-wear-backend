import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.post("/ssl-init", paymentController.initSslPayment);
router.post("/ssl-success", paymentController.sslSuccess);
router.post("/ssl-fail", paymentController.sslFail);
router.post("/ssl-cancel", paymentController.sslCancel);
router.post("/ssl-ipn", paymentController.sslIPN);

export const PaymentRoutes = router;
