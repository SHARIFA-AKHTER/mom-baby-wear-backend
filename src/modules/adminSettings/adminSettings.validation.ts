import { z } from "zod";

export const adminSettingValidation = z.object({

    key: z.string().min(1),
    value: z.string().min(1),
  })

