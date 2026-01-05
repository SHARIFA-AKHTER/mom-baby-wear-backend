"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../app/shared/prisma");
const config_1 = __importDefault(require("../config"));
const authenticate = async (req, res, next) => {
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
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid or expired token'
        });
    }
};
exports.authenticate = authenticate;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
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
exports.authorizeRoles = authorizeRoles;
