const express = require("express");
const router = express.Router();
const {
  getSiswa,
  insertSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswaId,
  deleteSiswaRecords,
} = require("../controller/siswaController");

router.get("/", getSiswa);
router.get("/delete/:id", deleteSiswa);
router.get("/:id", getSiswaId);

router.post("/tambah", insertSiswa);
router.post("/update", updateSiswa);

router.delete("/delete-all", deleteSiswaRecords);

module.exports = router;
