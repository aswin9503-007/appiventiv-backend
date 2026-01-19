const db = require("../db/index");

// GET all Tech Solution data
exports.getTechData = async (req, res) => {
    try {
        const settings = await db.query("SELECT * FROM tech_solution_settings LIMIT 1");
        const cards = await db.query("SELECT * FROM tech_cards ORDER BY sort_order ASC");
        res.status(200).json({ settings: settings.rows[0], cards: cards.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE Settings (Left Side)
exports.updateSettings = async (req, res) => {
    const { main_heading, fuel_title, fuel_subtext } = req.body;
    try {
        await db.query(
            "UPDATE tech_solution_settings SET main_heading=$1, fuel_title=$2, fuel_subtext=$3 WHERE id=1",
            [main_heading, fuel_title, fuel_subtext]
        );
        res.status(200).json({ message: "Settings updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CRUD for Cards (Create)
exports.createCard = async (req, res) => {
    const { title, description, icon, sort_order } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO tech_cards (title, description, icon, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, icon, sort_order]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CRUD for Cards (Update)
exports.updateCard = async (req, res) => {
    const { id } = req.params;
    const { title, description, icon, sort_order } = req.body;
    try {
        await db.query(
            "UPDATE tech_cards SET title=$1, description=$2, icon=$3, sort_order=$4 WHERE id=$5",
            [title, description, icon, sort_order, id]
        );
        res.status(200).json({ message: "Card updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CRUD for Cards (Delete)
exports.deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM tech_cards WHERE id=$1", [id]);
        res.status(200).json({ message: "Card deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};