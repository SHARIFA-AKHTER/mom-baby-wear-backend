"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.authWithGoogle = void 0;
const prisma_1 = require("../../app/shared/prisma");
const ApiError_1 = require("../../utils/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../../app/helper/jwtHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const client_1 = require("@prisma/client");
const ms_1 = __importDefault(require("ms"));
const hashPassword_1 = require("../../utils/hashPassword");
const google_auth_library_1 = require("google-auth-library");
const registerUser = async ({ name, email, password }) => {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("Email already used");
    const hashed = await bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_round));
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashed,
            needPasswordChange: false,
        },
    });
    const secret = config_1.default.jwt.secret;
    const signOptions = {
        expiresIn: (0, ms_1.default)(config_1.default.jwt.expires_in),
    };
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, signOptions);
    return { user, token };
};
const loginUser = async (payload) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: { email: payload.email },
    });
    const isCorrectPassword = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "Password is incorrect!");
    }
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ id: user.id, email: user.email, role: user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({ email: user.email, role: user.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange,
    };
};
const refreshToken = async (token) => {
    let decodedData;
    try {
        decodedData = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "Unauthorized user!");
    }
    const userData = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: client_1.UserStatus.ACTIVE
        },
    });
    const newAccessToken = jwtHelper_1.jwtHelper.generateToken({ email: userData.email, role: userData.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
        needPasswordChange: userData.needPasswordChange,
    };
};
const changePassword = async (user, payload) => {
    const userData = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const isCorrectPassword = await bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "Old password incorrect!");
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    await prisma_1.prisma.user.update({
        where: { email: userData.email },
        data: {
            password: hashedPassword,
            needPasswordChange: false,
        },
    });
    return { message: "Password changed successfully!" };
};
const getMe = async (accessToken) => {
    if (!accessToken)
        throw new Error("Access token missing");
    const decodedData = jwtHelper_1.jwtHelper.verifyToken(accessToken, config_1.default.jwt.secret);
    const userData = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const { id, email, role, needPasswordChange, status, name, profileImage } = userData;
    return { id, email, role, needPasswordChange, status, name, profileImage };
};
const client = new google_auth_library_1.OAuth2Client(config_1.default.google.client_id);
const authWithGoogle = async (payload) => {
    const { idToken } = payload;
    if (!idToken) {
        throw new Error("Google idToken required!");
    }
    // ✅ Verify token with Google
    const ticket = await client.verifyIdToken({
        idToken,
        audience: config_1.default.google.client_id,
    });
    const googleUser = ticket.getPayload();
    if (!googleUser?.email) {
        throw new Error("Google authentication failed!");
    }
    const { email, name, picture } = googleUser;
    // ✅ Check user exists
    let user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    // ✅ Create user if not exists
    if (!user) {
        user = await prisma_1.prisma.user.create({
            data: {
                email,
                name: name || "Google User",
                password: await (0, hashPassword_1.hashPassword)("google-auth"),
                profileImage: picture,
                role: "CUSTOMER",
                needPasswordChange: false,
            },
        });
    }
    // ✅ Generate JWT (MATCHES your middleware)
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
    }, config_1.default.jwt.secret, { expiresIn: "7d" });
    return {
        success: true,
        message: "Google login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
exports.authWithGoogle = authWithGoogle;
exports.AuthService = {
    registerUser,
    loginUser,
    refreshToken,
    changePassword,
    getMe,
    authWithGoogle: exports.authWithGoogle
};
