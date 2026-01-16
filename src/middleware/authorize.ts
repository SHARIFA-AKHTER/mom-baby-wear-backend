import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";
const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;

      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          `Forbidden: Access denied for ${user.role} role`
        );
      } 
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default authorize;
