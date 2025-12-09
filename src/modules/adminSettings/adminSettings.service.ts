import { prisma } from "../../app/shared/prisma";
import { ApiError } from "../../utils/ApiError";



  const setSetting = (key: string, value: string) =>{
    return prisma.adminSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

 const getSettings = () =>{
    return prisma.adminSettings.findMany();
  }

const getSetting = async (key: string) =>{
    const setting = await prisma.adminSettings.findUnique({ where: { key } });
    if (!setting) throw new ApiError(404, "Setting not found");
    return setting;
  }
  export const AdminSettingsService = {
setSetting,
getSettings,
getSetting
};
