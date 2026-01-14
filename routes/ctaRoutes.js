const express = require("express");
const router = express.Router();
const { getCTA, updateCTA } = require("../controllers/ctaController");

router.get("/", getCTA);
router.put("/update", updateCTA);

module.exports = router;