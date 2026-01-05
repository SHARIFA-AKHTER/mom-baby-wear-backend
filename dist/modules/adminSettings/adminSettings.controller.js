"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSettingsController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const adminSettings_service_1 = require("./adminSettings.service");
const setSetting = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { key, value } = req.body;
    const result = await adminSettings_service_1.AdminSettingsService.setSetting(key, value);
    res.json({ success: true, message: "Setting updated", data: result });
});
const getSettings = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await adminSettings_service_1.AdminSettingsService.getSettings();
    res.json({ success: true, data: result });
});
const getSetting = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await adminSettings_service_1.AdminSettingsService.getSetting(req.params.key);
    res.json({ success: true, data: result });
});
exports.AdminSettingsController = {
    setSetting,
    getSettings,
    getSetting
};
