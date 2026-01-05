"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
// src/modules/users/users.service.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../app/shared/prisma");
const ApiError_1 = require("../../utils/ApiError");
const createUser = async (payload) => {
    console.log("PAYLOAD:", payload);
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (existingUser) {
        throw new ApiError_1.ApiError(409, "User already exists with this email");
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    return prisma_1.prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });
};
const getAllUsers = () => {
    return prisma_1.prisma.user.findMany();
};
const getSingleUser = (id) => {
    return prisma_1.prisma.user.findUnique({ where: { id } });
};
const deleteUser = (id) => {
    return prisma_1.prisma.user.delete({ where: { id } });
};
exports.usersService = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
};
