"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSettingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adminSettings_controller_1 = require("./adminSettings.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const adminSettings_validation_1 = require("./adminSettings.validation");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN"), (0, validateRequest_1.validateRequest)(adminSettings_validation_1.adminSettingValidation), adminSettings_controller_1.AdminSettingsController.setSetting);
router.get("/", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN"), adminSettings_controller_1.AdminSettingsController.getSettings);
router.get("/:key", auth_1.authenticate, (0, auth_1.authorizeRoles)("ADMIN"), adminSettings_controller_1.AdminSettingsController.getSetting);
exports.AdminSettingsRoutes = router;
