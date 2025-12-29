
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../app/shared/prisma';
import config from '../config';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {

  let token = req.cookies?.accessToken || req.cookies?.token;

  const authHeader = req.headers.authorization;
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }


  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized: No token provided' 
    });
  }

  try {
    
    const payload: any = jwt.verify(token, config.jwt.secret as string);
    

    const user = await prisma.user.findUnique({ 
      where: { id: payload.id } 
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found in database' 
      });
    }

   
    if (user.status !== "ACTIVE") {
       return res.status(403).json({ 
         success: false, 
         message: 'User account is not active' 
       });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized: Invalid or expired token' 
    });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

 
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: Access denied for ${req.user.role} role` 
      });
    }
    next();
  };
};