import multer from "multer";

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Allow only a single file upload with the field name `profileImageUrl`
export const upload = multer({ storage }); // Ensure you export this
