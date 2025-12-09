export interface IPaymentInit {
  amount: number;
  orderId: string;
  currency?: string;
}

export interface IPaymentVerify {
  val_id: string;
  orderId: string;
}
