import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder if missing
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, randomName);
  }
});

// Allowed file types (PDF + Images)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isPdf = file.mimetype === "application/pdf";

  if (isImage || isPdf) cb(null, true);
  else cb(null, false);
};

// FINAL UPLOAD MIDDLEWARE
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

export default upload;
