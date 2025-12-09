export interface ICoupon {
  id?: string;
  code: string;
  discountType: "PERCENT" | "FLAT";
  discountValue: number;
  expiry: Date;
  minOrderValue?: number;
  isActive?: boolean;
  usedBy?: any;
}
