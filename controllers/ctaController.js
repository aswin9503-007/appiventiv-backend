const pool = require ("../db/index");

// GET: Fetch CTA Data.
exports.getCTA = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cta_section LIMIT 1");
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
};

// PUT: Update CTA Data via /update.
exports.updateCTA = async (req, res) => {
    const { title, button_text,redirect_url } = req.body;
    try {
        const result = await pool.query(
            "UPDATE cta_section SET title = $1, button_text = $2, redirect_url = $3 WHERE id = (SELECT id FROM cta_section LIMIT 1) RETURNING *",
            [title, button_text, redirect_url || '#']
        );
        res.status(200).json({
            message: "CTA Updated Successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
