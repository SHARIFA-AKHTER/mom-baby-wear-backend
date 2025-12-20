import { Product } from "@prisma/client";

export interface IStockLog {
  id?: string;
  productId: string;
  change: number; // +10 added, -1 deducted
  reason: "ORDER" | "RESTOCK" | "CANCEL";
  createdAt?: Date;
}
