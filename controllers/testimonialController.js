const db = require("../db/index");

// GET: Fetch everything (Settings + Cards)
exports.getTestimonials = async (req, res) => {
    try {
        const settings = await db.query("SELECT * FROM testimonial_settings LIMIT 1");
        const cards = await db.query("SELECT * FROM testimonial_cards ORDER BY sort_order ASC");
        res.status(200).json({ settings: settings.rows[0], cards: cards.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT: Update Heading Text
exports.updateSettings = async (req, res) => {
    const { heading_text } = req.body;
    try {
        await db.query("UPDATE testimonial_settings SET heading_text = $1 WHERE id = 1", [heading_text]);
        res.status(200).json({ message: "Settings updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CRUD for Individual Video Cards
exports.createCard = async (req, res) => {
    const { name, role, video_url, sort_order } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO testimonial_cards (name, role, video_url, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, role, video_url, sort_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCard = async (req, res) => {
    const { id } = req.params;
    const { name, role, video_url, sort_order } = req.body;
    try {
        await db.query(
            "UPDATE testimonial_cards SET name = $1, role = $2, video_url = $3, sort_order = $4 WHERE id = $5",
            [name, role, video_url, sort_order, id]
        );
        res.status(200).json({ message: "Card updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM testimonial_cards WHERE id = $1", [id]);
        res.status(200).json({ message: "Card deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};