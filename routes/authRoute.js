const express = require("express");
const router = express.Router();
const { login, updatePassword } = require("../controller/authController");

router.post("/login", login);
router.post("/update-password", updatePassword);

module.exports = router;
