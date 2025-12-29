
// import { Request, Response } from "express";
// import { paymentService } from "./payment.service";

// class PaymentController {

//   initSslPayment = async (req: Request, res: Response) => {
//     try {
   
//       const result = await paymentService.initSslPayment(req.body);
      
//       return res.status(200).json({
//         success: true,
//         message: "SSL Payment session created",
//         data: result, 
//       });
//     } catch (error: any) {
     
//       return res.status(400).json({
//         success: false,
//         message: error.message || "Failed to initialize payment",
//         error: error
//       });
//     }
//   };


//   sslIPN = async (req: Request, res: Response) => {
//     try {
//       const result = await paymentService.verifySslPayment(req.body);
//       res.json({
//         success: true,
//         message: "Payment verified successfully",
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }
//   };
// }

// export const paymentController = new PaymentController();

import { Request, Response } from "express";
import { paymentService } from "./payment.service";

class PaymentController {
  initSslPayment = async (req: Request, res: Response) => {
    try {
      const result = await paymentService.initSslPayment(req.body);
      return res.status(200).json({
        success: true,
        message: "SSL Payment session created",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to initialize payment",
      });
    }
  };

  sslSuccess = async (req: Request, res: Response) => {
    try {
    
      await paymentService.verifySslPayment(req.body);

     
      res.redirect(`http://localhost:3000/payment/success?tran_id=${req.body.tran_id}`);
    } catch (error) {
      res.redirect(`http://localhost:3000/payment/error`);
    }
  };

  sslFail = async (req: Request, res: Response) => {
    res.redirect(`http://localhost:3000/payment/fail`);
  };

  sslCancel = async (req: Request, res: Response) => {
    res.redirect(`http://localhost:3000/payment/cancel`);
  };

  sslIPN = async (req: Request, res: Response) => {
    try {
      await paymentService.verifySslPayment(req.body);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };
}

export const paymentController = new PaymentController();