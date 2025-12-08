import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../app/shared/prisma';
import config from '../config';

export interface AuthRequest extends Request {
user?: any;
}


export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ success: false, message: 'Unauthorized' });
const token = authHeader.split(' ')[1];
try {
const payload: any = jwt.verify(token, config.jwt_secret);
const user = await prisma.user.findUnique({ where: { id: payload.id } });
if (!user) return res.status(401).json({ success: false, message: 'User not found' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ success: false, message: 'Invalid token' });
}
};


export const authorizeRoles = (...roles: string[]) => {
return (req: AuthRequest, res: Response, next: NextFunction) => {
if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
next();
};
};