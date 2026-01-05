"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post("/ssl-init", payment_controller_1.paymentController.initSslPayment);
router.post("/ssl-success", payment_controller_1.paymentController.sslSuccess);
router.post("/ssl-fail", payment_controller_1.paymentController.sslFail);
router.post("/ssl-cancel", payment_controller_1.paymentController.sslCancel);
router.post("/ssl-ipn", payment_controller_1.paymentController.sslIPN);
exports.PaymentRoutes = router;
