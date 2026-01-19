const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/serviceController");

router.get("/", ctrl.getAllServices);
router.post("/create", ctrl.createService);
router.put("/update/:id", ctrl.updateService);
router.delete("/delete/:id", ctrl.deleteService);

module.exports = router;