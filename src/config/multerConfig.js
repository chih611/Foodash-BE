const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { entityType } = req.params;
    let folder = "uploads/";
    switch (entityType) {
      case "items":
        folder += "items/";
        break;
      case "categories":
        folder += "categories/";
        break;
      case "customers":
        folder += "customers/";
        break;
      default:
        folder += "others/";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
