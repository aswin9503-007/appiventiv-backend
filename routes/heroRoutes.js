const express = require("express");
const router = express.Router();
const {getHero, updateHero} = require("../controllers/heroController")

router.get("/", getHero);
router.put("/", updateHero); // Use PUT for updating existing data


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