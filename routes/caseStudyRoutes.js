const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/caseStudyController");

router.get("/", ctrl.getAllCaseStudies);
router.post("/create", ctrl.createCaseStudy);
router.put("/update/:id", ctrl.updateCaseStudy);
router.delete("/delete/:id", ctrl.deleteCaseStudy);

module.exports = router;