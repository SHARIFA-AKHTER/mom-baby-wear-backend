import express from "express";
import { AdminSettingsController } from "./adminSettings.controller";
import { authenticate, authorizeRoles } from "../../middleware/auth";

const router = express.Router();

// Only Admin
router.post("/", authenticate, authorizeRoles("ADMIN"), AdminSettingsController.setSetting);
router.get("/", authenticate, authorizeRoles("ADMIN"), AdminSettingsController.getSettings);
router.get("/:key", authenticate, authorizeRoles("ADMIN"), AdminSettingsController.getSetting);

export const AdminSettingsRoutes = router;
