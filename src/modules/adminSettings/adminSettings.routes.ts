import express from "express";
import { AdminSettingsController } from "./adminSettings.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { adminSettingValidation } from "./adminSettings.validation";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  validateRequest(adminSettingValidation),
  AdminSettingsController.setSetting
);

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  AdminSettingsController.getSettings
);

router.get(
  "/:key",
  authenticate,
  authorizeRoles("ADMIN"),
  AdminSettingsController.getSetting
);
export const AdminSettingsRoutes = router;
