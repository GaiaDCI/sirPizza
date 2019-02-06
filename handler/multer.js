const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpeg|jpg|gif/)) {
      cb(new Error("this format is not supported"), false);
      return;
    }
    cb(null, true);
  }
});
