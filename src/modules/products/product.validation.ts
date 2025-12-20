import { z } from "zod";


export const createProductSchema = z.object({
body: z.object({
title: z.string().min(1),
price: z.number().min(1),
stock: z.number().min(0),
description: z.string().min(5),
 images: z.array(z.string()),   
categoryId: z.string().min(1),
}),
});