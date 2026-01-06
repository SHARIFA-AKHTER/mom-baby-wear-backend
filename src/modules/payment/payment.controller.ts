

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
//       });
//     }
//   };

//   sslSuccess = async (req: Request, res: Response) => {
//     try {
    
//       await paymentService.verifySslPayment(req.body);

     
//       res.redirect(`http://localhost:3000/payment/success?tran_id=${req.body.tran_id}`);
//     } catch (error) {
//       res.redirect(`http://localhost:3000/payment/error`);
//     }
//   };

//   sslFail = async (req: Request, res: Response) => {
//     res.redirect(`http://localhost:3000/payment/fail`);
//   };

//   sslCancel = async (req: Request, res: Response) => {
//     res.redirect(`http://localhost:3000/payment/cancel`);
//   };

//   sslIPN = async (req: Request, res: Response) => {
//     try {
//       await paymentService.verifySslPayment(req.body);
//       res.json({ success: true });
//     } catch (error) {
//       res.status(500).json({ success: false });
//     }
//   };
// }

// export const paymentController = new PaymentController();

import { Request, Response } from "express";
import { paymentService } from "./payment.service";
import config from "../../config";

const frontendUrl = config.frontend_url|| "http://localhost:3000";

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
    
      res.redirect(`${frontendUrl}/payment/success?tran_id=${req.body.tran_id}`);
    } catch (error) {
      res.redirect(`${frontendUrl}/payment/error`);
    }
  };

  sslFail = async (req: Request, res: Response) => {
    res.redirect(`${frontendUrl}/payment/fail`);
  };

  sslCancel = async (req: Request, res: Response) => {
    res.redirect(`${frontendUrl}/payment/cancel`);
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