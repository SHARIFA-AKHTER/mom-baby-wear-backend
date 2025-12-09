// src/types/sslcommerz-lts.d.ts
declare module "sslcommerz-lts" {
  interface SSLCommerzConfig {
    store_id: string;
    store_passwd: string;
    is_live: boolean;
  }

  interface SSLCommerzPaymentInit {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    emi_option?: number;
    cus_name?: string;
    cus_email?: string;
    cus_add1?: string;
    cus_city?: string;
    cus_postcode?: string;
    cus_country?: string;
    cus_phone?: string;
    shipping_method?: string;
    product_name?: string;
    product_category?: string;
    product_profile?: string;
    [key: string]: any;
  }

  class SSLCommerzPayment {
    constructor(store_id: string, store_passwd: string, is_live: boolean | number);
    init(data: SSLCommerzPaymentInit): Promise<any>;
    // some versions might expose other methods; treat them as any
    [key: string]: any;
  }

  export = SSLCommerzPayment;
}
