const express = require("express");
const router = express.Router();

const {
    getTrustContent,
    updateTrustText,
    addLogo,
    deleteLogo
} = require ("../controllers/trustController")

router.get("/", getTrustContent);
router.put("/text", updateTrustText);
router.post("/logo", addLogo);
router.delete("/logo/:id", deleteLogo);

module.exports = router;