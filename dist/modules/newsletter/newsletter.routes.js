"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const newsletter_controller_1 = require("./newsletter.controller");
const newsletter_validation_1 = require("./newsletter.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = express_1.default.Router();
router.post('/subscribe', (0, validateRequest_1.validateRequest)(newsletter_validation_1.newsletterValidation), newsletter_controller_1.newsletterController.subscribe);
router.get('/subscribers', 
//   authenticate,
//   authorize('ADMIN'),
newsletter_controller_1.newsletterController.getAllSubscribers);
exports.NewsletterRoutes = router;
