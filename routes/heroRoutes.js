const express = require("express");
const router = express.Router();
const {getHeroContent} = require("../controllers/heroController")

router.get("/hero", getHeroContent)

module.exports = router;