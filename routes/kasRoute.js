const express = require("express");
const {
  getKas,
  insertKas,
  getKasId,
  getKasByStatus,
  updateKas,
  deleteKas,
  deleteKasRecords,
} = require("../controller/kasController");
const router = express.Router();

router.get("/", getKas);
router.get("/:id", getKasId);
router.get("/status/:status", getKasByStatus);
router.get("/delete/:id", deleteKas);

router.post("/tambah", insertKas);
router.post("/update", updateKas);
router.delete("/delete-all", deleteKasRecords);

module.exports = router;
