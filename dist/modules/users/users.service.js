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
const paginationHelper_1 = require("../../utils/paginationHelper");
const client_1 = require("@prisma/client");
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
const getAllUsers = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                { name: { contains: searchTerm, mode: client_1.Prisma.QueryMode.insensitive } },
                { email: { contains: searchTerm, mode: client_1.Prisma.QueryMode.insensitive } },
            ],
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([field, value]) => ({
                [field]: value
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = await prisma_1.prisma.user.count({ where: whereConditions });
    return {
        meta: { page, limit, total },
        result: result,
    };
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
