const express = require("express");
const {
  uploadProfile,
  deleteProfile,
} = require("../controller/uploadController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: diskStorage });

router.post("/profile", upload.single("file"), uploadProfile);
router.post("/delete-profile", deleteProfile);

module.exports = router;
