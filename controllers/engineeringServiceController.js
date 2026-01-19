const db = require("../db/index");

// GET all services
exports.getAllServices = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM engineering_services ORDER BY sort_order ASC",
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new service
exports.createService = async (req, res) => {
  const { title, description, icon, sort_order } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO engineering_services (title, description, icon, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, icon, sort_order || 0],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a service
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, icon, sort_order } = req.body;
  try {
    const result = await db.query(
      "UPDATE engineering_services SET title = $1, description = $2, icon = $3, sort_order = $4 WHERE id = $5 RETURNING *",
      [title, description, icon, sort_order, id],
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a service
exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM engineering_services WHERE id = $1", [id]);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
