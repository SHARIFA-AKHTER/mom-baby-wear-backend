"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const users_service_1 = require("./users.service");
const uploadImage_1 = require("../../middleware/uploadImage");
const pick_1 = __importDefault(require("../../utils/pick"));
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (req.file) {
        const uploadedUrl = await (0, uploadImage_1.uploadToCloudinary)(req.file);
        req.body.profileImage = uploadedUrl;
    }
    const result = await users_service_1.usersService.createUser(req.body);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    (0, sendResponse_1.sendResponse)(res, 201, true, "User created successfully", result);
});
const getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, ["searchTerm", "role", "status"]);
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const dataWithMeta = await users_service_1.usersService.getAllUsers(filters, options);
    return (0, sendResponse_1.sendResponse)(res, 200, true, "Users fetched successfully", dataWithMeta);
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await users_service_1.usersService.getSingleUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "User fetched successfully", result);
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await users_service_1.usersService.deleteUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "User deleted successfully", result);
});
exports.usersController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser
};
function uploadImage(path) {
    throw new Error("Function not implemented.");
}
