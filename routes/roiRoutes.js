const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/roiController");

router.get("/", ctrl.getROI);
router.post("/create", ctrl.createROI);
router.put("/update/:id", ctrl.updateROI);
router.delete("/delete/:id", ctrl.deleteROI);

module.exports = router;