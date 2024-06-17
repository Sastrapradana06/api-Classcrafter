const express = require("express");
const router = express.Router();
const {
  getGuru,
  getGuruId,
  insertGuru,
  updateGuru,
  deleteGuru,
  deleteGuruRecords,
} = require("../controller/guruController");

router.get("/", getGuru);
router.get("/:id", getGuruId);
router.post("/tambah", insertGuru);
router.post("/update", updateGuru);
router.get("/delete/:id", deleteGuru);

router.delete("/delete-all", deleteGuruRecords);

module.exports = router;
