const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); 

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Hero Route
app.use("/api/hero", require("./routes/heroRoutes"));

// TrustSection Route
app.use("/api/trust", require("./routes/trustSectionRoutes"));

//StatsSection Route
app.use("/api/stats", require("./routes/statsRoutes"));

app.get("/", (req, res) => {
  res.send("Appinventiv Backend is running...");
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;