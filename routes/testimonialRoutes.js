const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/testimonialController");

router.get("/", ctrl.getTestimonials);
router.put("/settings", ctrl.updateSettings);
router.post("/create", ctrl.createCard);
router.put("/update/:id", ctrl.updateCard);
router.delete("/delete/:id", ctrl.deleteCard);

module.exports = router;