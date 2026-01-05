"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const register = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.registerUser(req.body);
    res.cookie("accessToken", result.token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.sendResponse)(res, 200, true, "Registered successfully", { needPasswordChange: result.user.needPasswordChange });
});
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    res.cookie("accessToken", result.accessToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
    });
    res.cookie("refreshToken", result.refreshToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90,
    });
    (0, sendResponse_1.sendResponse)(res, 200, true, "Login successful", {
        accessToken: result.accessToken,
        needPasswordChange: result.needPasswordChange
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const token = req.cookies.refreshToken;
    const result = await auth_service_1.AuthService.refreshToken(token);
    res.cookie("accessToken", result.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
    });
    (0, sendResponse_1.sendResponse)(res, 200, true, "Access token refreshed successfully", result);
});
const changePassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.changePassword(req.user, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Password changed", result);
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    // Get token from cookies
    const token = req.cookies?.accessToken;
    if (!token) {
        return (0, sendResponse_1.sendResponse)(res, http_status_1.default.UNAUTHORIZED, false, "Not logged in", null);
    }
    const user = await auth_service_1.AuthService.getMe(token);
    (0, sendResponse_1.sendResponse)(res, http_status_1.default.OK, true, "User retrieved successfully!", user);
});
const googleLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.authWithGoogle(req.body);
    res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.sendResponse)(res, 200, true, result.message, result.user);
});
//   res.clearCookie("accessToken", {
//     secure: true,
//     httpOnly: true,
//     sameSite: "none",
//   });
//   res.clearCookie("refreshToken", {
//     secure: true,
//     httpOnly: true,
//     sameSite: "none",
//   });
//   sendResponse(
//     res,
//     httpStatus.OK,
//     true,
//     "Logged out successfully!",
//     null
//   );
// });
const logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const cookieOptions = {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/"
    };
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Logged out successfully!", null);
});
exports.AuthController = {
    register,
    login,
    refreshToken,
    changePassword,
    getMe,
    googleLogin,
    logout
};
