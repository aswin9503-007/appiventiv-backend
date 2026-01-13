const express = require("express");
const router = express.Router();
const { getAllStats, addStat, updateStat, deleteStat } = require("../controllers/statsController");

router.get("/", getAllStats);
router.post("/", addStat);
router.put("/:id", updateStat);
router.delete("/:id", deleteStat);

module.exports = router;