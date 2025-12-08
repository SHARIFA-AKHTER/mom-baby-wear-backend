import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodObject } from 'zod';

export const validateRequest =
  (schema: ZodObject<any> | ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: result.error.format(), // Zod v3 ONLY
      });
    }

    req.body = result.data.body;
    next();
  };
