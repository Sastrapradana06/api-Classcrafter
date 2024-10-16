const express = require("express");
const router = express.Router();
const { handleSendNotif } = require("../controller/notifController");

router.post("/send-notif", handleSendNotif);

module.exports = router;
