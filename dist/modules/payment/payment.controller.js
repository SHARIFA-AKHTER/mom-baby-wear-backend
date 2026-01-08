"use strict";
// import { Request, Response } from "express";
// import { paymentService } from "./payment.service";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
const config_1 = __importDefault(require("../../config"));
const frontendUrl = config_1.default.frontend_url || "https://mom-baby-wear-frontend.vercel.app";
class PaymentController {
    constructor() {
        this.initSslPayment = async (req, res) => {
            try {
                const result = await payment_service_1.paymentService.initSslPayment(req.body);
                return res.status(200).json({
                    success: true,
                    message: "SSL Payment session created",
                    data: result,
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message || "Failed to initialize payment",
                });
            }
        };
        this.sslSuccess = async (req, res) => {
            try {
                await payment_service_1.paymentService.verifySslPayment(req.body);
                res.redirect(`${frontendUrl}/payment/success?tran_id=${req.body.tran_id}`);
            }
            catch (error) {
                res.redirect(`${frontendUrl}/payment/error`);
            }
        };
        this.sslFail = async (req, res) => {
            res.redirect(`${frontendUrl}/payment/fail`);
        };
        this.sslCancel = async (req, res) => {
            res.redirect(`${frontendUrl}/payment/cancel`);
        };
        this.sslIPN = async (req, res) => {
            try {
                await payment_service_1.paymentService.verifySslPayment(req.body);
                res.json({ success: true });
            }
            catch (error) {
                res.status(500).json({ success: false });
            }
        };
    }
}
exports.paymentController = new PaymentController();
