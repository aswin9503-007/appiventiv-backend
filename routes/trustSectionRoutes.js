const express = require("express");
const router = express.Router();

const {
    getTrustContent,
    updateTrustText, // Now exists!
    addLogo,
    updateLogo,     // Added this import
    deleteLogo
} = require("../controllers/trustController");

router.get("/", getTrustContent);
router.put("/text", updateTrustText);      // For the title/desc
router.post("/logo", addLogo);             // For new logos
router.put("/logo/:id", updateLogo);       // Added: For editing logos
router.delete("/logo/:id", deleteLogo);    // For deleting logos

module.exports = router;