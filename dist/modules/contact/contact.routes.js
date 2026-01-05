"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const contact_validation_1 = require("./contact.validation");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post('/send-message', (0, validateRequest_1.validateRequest)(contact_validation_1.ContactValidation.createContactMessageZodSchema), contact_controller_1.ContactController.createMessage);
router.get('/all-messages', auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN", "MANAGER", "STAFF"), contact_controller_1.ContactController.getAllMessages);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN"), contact_controller_1.ContactController.deleteMessage);
exports.ContactRoutes = router;
