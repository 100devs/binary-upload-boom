const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
 fileFilter: (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

  const allowedMime = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedExt.includes(ext) || !allowedMime.includes(file.mimetype)) {
    return cb(new Error("File type is not supported"), false);
  }

  cb(null, true);
}
});
