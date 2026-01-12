const express = require("express");
const router = express.Router();
const {getHeroContent} = require("../controllers/heroController")

router.get("/hero", getHeroContent)


// Test Route for DB connection
router.get("/test-db", async (req, res) => {
  const pool = require("../db");
  try {
    const result = await pool.query("SELECT 1");
    res.json({ success: true, message: "DB connected ✅", result: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;