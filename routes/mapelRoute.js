const express = require("express");
const router = express.Router();
const {
  getMapel,
  insertMapel,
  deleteMapel,
  updateMapel,
  getMapelId,
} = require("../controller/mapelController");

router.get("/", getMapel);
router.get("/delete/:id", deleteMapel);
router.get("/:id", getMapelId);

router.post("/tambah", insertMapel);
router.post("/update", updateMapel);

module.exports = router;
