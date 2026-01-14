const pool = require("../db/index");

// READ: Get Hero Data
exports.getHero = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM hero_section LIMIT 1");
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE: Change Hero Content
exports.updateHero = async (req, res) => {
    const { title, description, image_url } = req.body;
    try {
        const result = await pool.query(
            "UPDATE hero_section SET title = $1, description = $2, image_url = $3 WHERE id = (SELECT id FROM hero_section LIMIT 1) RETURNING *",
            [title, description, image_url]
        );
        res.status(200).json({ message: "Hero updated successfully", data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};