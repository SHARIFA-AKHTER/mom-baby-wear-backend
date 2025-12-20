import multer from "multer";
import path from "path";
import fs from "fs";
import cloudinary from "../config/cloudinary";

// Local Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });

// Cloudinary Upload Function
export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "mom-and-baby",
    });

    // Delete local file after upload
    fs.unlinkSync(file.path);

    return result.secure_url;
  } catch (err) {
    console.log("Cloudinary Upload Error:", err);
    return null;
  }
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};

