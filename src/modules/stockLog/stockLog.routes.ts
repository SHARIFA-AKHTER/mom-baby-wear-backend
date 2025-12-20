import express from "express";
import { stockLogController } from "./stockLog.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createStockLogSchema } from "./stockLog.validation";

const router = express.Router();

// create stock log
router.post(
  "/create",
  validateRequest(createStockLogSchema),
  stockLogController.createStockLog
);

// get all stock logs
router.get("/", stockLogController.getAllStockLogs);

export const stockLogRoutes = router;
