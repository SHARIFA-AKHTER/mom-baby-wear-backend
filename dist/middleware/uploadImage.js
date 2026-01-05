"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// Local Storage Config
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(process.cwd(), "/uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});
exports.upload = (0, multer_1.default)({ storage });
// Cloudinary Upload Function
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary_1.default.uploader.upload(file.path, {
            folder: "mom-and-baby",
        });
        // Delete local file after upload
        fs_1.default.unlinkSync(file.path);
        return result.secure_url;
    }
    catch (err) {
        console.log("Cloudinary Upload Error:", err);
        return null;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
exports.fileUploader = {
    upload: exports.upload,
    uploadToCloudinary: exports.uploadToCloudinary,
};
