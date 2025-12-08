// import { Response } from "express";

// export const sendResponse = <T>(
// res: Response, res: Response<any, Record<string, any>>, statusCode: number, success: boolean, message: string, p0: { needPasswordChange: boolean; }, data: T) => {
//   return res.status(statusCode).json({
//     success,
//     message,
//     data,
//   });
// };

import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
