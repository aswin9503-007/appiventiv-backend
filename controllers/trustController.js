const pool = require("../db");

// READ: Get all content and logos
exports.getTrustContent = async (req, res) => {
  try {
    const content = await pool.query("SELECT * FROM trust_content LIMIT 1");
    const logos = await pool.query("SELECT * FROM brand_logos ORDER BY id ASC");
    res.status(200).json({
      content: content.rows[0],
      logos: logos.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Update the main text
exports.updateTrustText = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE trust_content SET title = $1, description = $2 WHERE id = (SELECT id FROM trust_content LIMIT 1) RETURNING *",
      [title, description]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE: Add a new logo
exports.addLogo = async (req, res) => {
  const { image_url, alt_text } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO brand_logos (image_url, alt_text) VALUES ($1, $2) RETURNING *",
      [image_url, alt_text]
    );
    res.status(201).json(result.rows[0]);
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