const express = require("express");
const router = express.Router();
const {
  getSiswa,
  insertSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswaId,
} = require("../controller/siswaController");

router.get("/", getSiswa);
router.get("/delete/:id", deleteSiswa);
router.get("/:id", getSiswaId);

router.post("/tambah", insertSiswa);
router.post("/update", updateSiswa);
module.exports = router;
