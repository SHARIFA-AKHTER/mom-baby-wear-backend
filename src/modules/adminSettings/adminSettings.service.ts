import { prisma } from "../../app/shared/prisma";


export const AdminSettingsService = {
  async setSetting(key: string, value: string) {
    return prisma.adminSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  },

  async getSettings() {
    return prisma.adminSettings.findMany();
  },

  async getSetting(key: string) {
    const setting = await prisma.adminSettings.findUnique({ where: { key } });
    if (!setting) throw new ApiError(404, "Setting not found");
    return setting;
  },
};
