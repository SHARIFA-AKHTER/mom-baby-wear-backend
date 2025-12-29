import SSLCommerzPayment from "sslcommerz-lts";
import { prisma } from "../../app/shared/prisma";
import config from "../../config";

const is_live = false;

class PaymentService {
  async initSslPayment(payload: {
    customerPhone: string;
    customerName: string;
    customerEmail: string;
    amount: number;
    orderId: string;
  }) {
    const data = {
      total_amount: Number(payload.amount),
      currency: "BDT",
      tran_id: payload.orderId,
      success_url: `http://localhost:5000/api/payments/ssl-success`,
      fail_url: `http://localhost:5000/api/payments/ssl-fail`,
      cancel_url: `http://localhost:5000/api/payments/ssl-cancel`,
      ipn_url: `http://localhost:5000/api/payments/ssl-ipn`,

      shipping_method: "NO",
      product_name: "Order Payment",
      product_category: "General",
      product_profile: "general",
      cus_name: payload.customerName || "Customer Name",
      cus_email: payload.customerEmail || "customer@mail.com",
      cus_phone: payload.customerPhone || "01711111111",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1212",
      cus_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(
      config.ssl.store_id || "demo",
      config.ssl.store_pass || "demo",
      is_live
    );

    const response = await sslcz.init(data);

    if (response?.GatewayPageURL) {
      return response.GatewayPageURL;
    } else {
      throw new Error(response?.failedreason || "Failed to initialize SSLCommerz");
    }
  }

  async verifySslPayment(payload: any) {
    const { tran_id, val_id, amount, status } = payload;

    if (status === 'VALID') {
        const order = await prisma.order.update({
            where: { id: tran_id },
            data: {
            },
          });
      
          await prisma.payment.create({
            data: {
              orderId: tran_id,
              amount: parseFloat(amount),
              gateway: "SSLCommerz",
              transactionId: val_id,
              status: "SUCCESS",
            },
          });
      
          return order;
    }
    throw new Error("Payment is not valid");
  }
}

export const paymentService = new PaymentService();

// import SSLCommerzPayment from "sslcommerz-lts";
// import { prisma } from "../../app/shared/prisma";
// import config from "../../config";

// const is_live = false;

// class PaymentService {
//   async initSslPayment(payload: {
//     customerPhone: string;
//     customerName: string;
//     customerEmail: string;
//     amount: number;
//     orderId: string;
//   }) {
//    const data = {
//   total_amount: Number(payload.amount), 
//   currency: "BDT",
//   tran_id: payload.orderId,

//   // success_url: `${config.ssl.backend_url}/api/payments/ssl-success`,
//   // fail_url: `${config.ssl.backend_url}/api/payments/ssl-fail`,
//   // cancel_url: `${config.ssl.backend_url}/api/payments/ssl-cancel`,
//   // ipn_url: `${config.ssl.backend_url}/api/payments/ssl-ipn`,
//   success_url: `http://localhost:5000/api/payments/ssl-int`, // আপনার পোর্ট কি 5000?
//   fail_url: `http://localhost:5000/api/payments/ssl-fail`,
//   cancel_url: `http://localhost:5000/api/payments/ssl-cancel`,
//   ipn_url: `http://localhost:5000/api/payments/ssl-ipn`,
//   shipping_method: "NO",
//   product_name: "Order Payment",
//   product_category: "General",
//   product_profile: "general",
//   cus_name: payload.customerName || "Customer Name",
//   cus_email: payload.customerEmail || "customer@mail.com",
//   cus_phone: payload.customerPhone || "01711111111",

//   cus_add1: "Dhaka",
//   cus_add2: "Dhaka",
//   cus_city: "Dhaka",
//   cus_state: "Dhaka",
//   cus_postcode: "1212",
//   cus_country: "Bangladesh",
// };
//     console.log("Store ID:", config.ssl.store_id);
//     console.log("Store Pass:", config.ssl.store_pass);
//     const sslcz = new SSLCommerzPayment(
//       config.ssl.store_id || "demo",
//       config.ssl.store_pass || "demo",
//       is_live
//     );


//     const response = await sslcz.init(data);

//     if (response?.GatewayPageURL) {
//       return response.GatewayPageURL;
//     } else {
//       console.error("SSLCommerz Error Response:", response);
//       throw new Error(
//         response?.failedreason || "Failed to initialize SSLCommerz"
//       );
//     }
//   }

//   async verifySslPayment(payload: any) {
//     const { tran_id, val_id, amount } = payload;

//     const order = await prisma.order.update({
//       where: { id: tran_id },
//       data: {
//         status: "PROCESSING",
//       },
//     });

//     await prisma.payment.create({
//       data: {
//         orderId: tran_id,
//         amount: parseFloat(amount),
//         gateway: "SSLCommerz",
//         transactionId: val_id,
//         status: "SUCCESS",
//       },
//     });

//     return order;
//   }
// }

// export const paymentService = new PaymentService();
