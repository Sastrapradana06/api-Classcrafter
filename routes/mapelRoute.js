const express = require("express");
const router = express.Router();
const {
  getMapel,
  insertMapel,
  deleteMapel,
  updateMapel,
  getMapelId,
  deleteMapelRecords,
} = require("../controller/mapelController");

router.get("/", getMapel);
router.get("/delete/:id", deleteMapel);
router.get("/:id", getMapelId);

router.post("/tambah", insertMapel);
router.post("/update", updateMapel);
router.delete("/delete-all", deleteMapelRecords);

module.exports = router;
