const pool = require("../db");

exports.getHeroContent = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT title, description FROM hero_section LIMIT 1"
        );

        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};