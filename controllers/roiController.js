const db = require("../db/index");

// GET all ROI cards
exports.getROI = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM roi_section ORDER BY sort_order ASC");
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE new ROI card
exports.createROI = async (req, res) => {
    const { tag, icon, title, description, sort_order } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO roi_section (tag, icon, title, description, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [tag, icon, title, description, sort_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE ROI card
exports.updateROI = async (req, res) => {
    const { id } = req.params;
    const { tag, icon, title, description, sort_order } = req.body;
    try {
        await db.query(
            "UPDATE roi_section SET tag=$1, icon=$2, title=$3, description=$4, sort_order=$5 WHERE id=$6",
            [tag, icon, title, description, sort_order, id]
        );
        res.status(200).json({ message: "ROI updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE ROI card
exports.deleteROI = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM roi_section WHERE id = $1", [id]);
        res.status(200).json({ message: "ROI deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};