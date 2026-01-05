import { z } from "zod";

export const adminSettingValidation = z.object({
body: z.object({
    key: z.string().min(1),
    value: z.string().min(1),
  })

});