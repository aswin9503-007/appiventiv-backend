const pool = require("../db/index");

// READ: Get all stats sorted by order
exports.getAllStats = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM stats_grid ORDER BY sort_order ASC, id ASC");
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE: Add a new stat card
exports.addStat = async (req, res) => {
    const { number, title, description, sort_order } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO stats_grid (number, title, description, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
            [number, title, description, sort_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE: Edit an existing stat card
exports.updateStat = async (req, res) => {
    const { id } = req.params;
    const { number, title, description, sort_order } = req.body;
    try {
        const result = await pool.query(
            "UPDATE stats_grid SET number = $1, title = $2, description = $3, sort_order = $4 WHERE id = $5 RETURNING *",
            [number, title, description, sort_order, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE: Remove a stat card
exports.deleteStat = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM stats_grid WHERE id = $1", [id]);
        res.status(200).json({ message: "Stat deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};