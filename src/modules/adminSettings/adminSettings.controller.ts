
import { catchAsync } from "../../utils/catchAsync";
import { AdminSettingsService } from "./adminSettings.service";

export const AdminSettingsController = {
  setSetting: catchAsync(async (req: { body: { key: any; value: any; }; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const { key, value } = req.body;
    const result = await AdminSettingsService.setSetting(key, value);
    res.json({ success: true, message: "Setting updated", data: result });
  }),

  getSettings: catchAsync(async (req: any, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const result = await AdminSettingsService.getSettings();
    res.json({ success: true, data: result });
  }),

  getSetting: catchAsync(async (req: { params: { key: string; }; }, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const result = await AdminSettingsService.getSetting(req.params.key);
    res.json({ success: true, data: result });
  }),
};
