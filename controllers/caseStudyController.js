const db = require("../db/index");

// READ ALL
exports.getAllCaseStudies = async (req, res) => {
    try {
        const studies = await db.query("SELECT * FROM case_studies ORDER BY id ASC");
        const results = await db.query("SELECT * FROM case_study_results");

        const formattedData = studies.rows.map(study => ({
            ...study,
            results: results.rows.filter(r => r.case_study_id === study.id)
        }));

        res.status(200).json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE
exports.createCaseStudy = async (req, res) => {
    const { slug, client, title, img_url, results } = req.body;
    try {
        const studyResult = await db.query(
            "INSERT INTO case_studies (slug, client, title, img_url) VALUES ($1, $2, $3, $4) RETURNING *",
            [slug, client, title, img_url]
        );
        const newId = studyResult.rows[0].id;

        if (results && Array.isArray(results)) {
            for (let item of results) {
                await db.query(
                    "INSERT INTO case_study_results (case_study_id, val, lab) VALUES ($1, $2, $3)",
                    [newId, item.val, item.lab]
                );
            }
        }
        res.status(201).json({ message: "Created", id: newId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
exports.updateCaseStudy = async (req, res) => {
    const { id } = req.params;
    const { client, title, img_url, results } = req.body;
    try {
        await db.query(
            "UPDATE case_studies SET client = $1, title = $2, img_url = $3 WHERE id = $4",
            [client, title, img_url, id]
        );

        if (results) {
            // Delete old results and insert new ones to keep data in sync
            await db.query("DELETE FROM case_study_results WHERE case_study_id = $1", [id]);
            for (let item of results) {
                await db.query(
                    "INSERT INTO case_study_results (case_study_id, val, lab) VALUES ($1, $2, $3)",
                    [id, item.val, item.lab]
                );
            }
        }
        res.status(200).json({ message: "Updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deleteCaseStudy = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM case_studies WHERE id = $1", [id]);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};