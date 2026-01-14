const pool = require("../db/index");

// READ: Get all content and logos
exports.getTrustContent = async (req, res) => {
  try {
    const content = await pool.query("SELECT * FROM trust_content LIMIT 1");
    const logos = await pool.query("SELECT * FROM brand_logos ORDER BY sort_order ASC, id ASC");
    res.status(200).json({
      content: content.rows[0],
      logos: logos.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// NEW: UPDATE Trust Section Text (Title/Description)
exports.updateTrustText = async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            "UPDATE trust_content SET title = $1, description = $2 WHERE id = (SELECT id FROM trust_content LIMIT 1) RETURNING *",
            [title, description]
        );
        res.status(200).json({ message: "Text updated successfully", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE: Add a new logo
exports.addLogo = async (req, res) => {
  const { image_url, alt_text, sort_order } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO brand_logos (image_url, alt_text, sort_order) VALUES ($1, $2, $3) RETURNING *",
      [image_url, alt_text, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Update an existing logo
exports.updateLogo = async (req, res) => {
  const { id } = req.params;
  const { image_url, alt_text, sort_order } = req.body;
  try {
    const result = await pool.query(
      "UPDATE brand_logos SET image_url = $1, alt_text = $2, sort_order = $3 WHERE id = $4 RETURNING *",
      [image_url, alt_text, sort_order, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Remove a logo
exports.deleteLogo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM brand_logos WHERE id = $1", [id]);
    res.status(200).json({ message: "Logo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};