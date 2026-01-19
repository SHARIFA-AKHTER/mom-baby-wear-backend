"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../utils/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "You are not authorized");
            }
            if (roles.length && !roles.includes(user.role)) {
                throw new ApiError_1.ApiError(http_status_1.default.FORBIDDEN, `Forbidden: Access denied for ${user.role} role`);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = authorize;
