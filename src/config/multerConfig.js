const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure that all item images are stored in '/uploads/items'
    let folder = "uploads/items/";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
