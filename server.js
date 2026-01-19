const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Simpler import

const app = express();

// 1. Improved CORS for Vercel
app.use(cors({
  origin: "https://web-development-practice-six.vercel.app",
  credentials: true
}));

app.use(express.json());

// 2. Health Check Route
app.get("/", (req, res) => {
  res.send("Appinventiv Backend is running...");
});

// 3. Routes - Double check these filenames match EXACTLY (Case-Sensitive!)
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/trust", require("./routes/trustSectionRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/cta", require("./routes/ctaRoutes"));
app.use("/api/case-studies", require("./routes/caseStudyRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/services", require("./routes/engineeringServiceRoutes"));

// 4. Vercel doesn't need app.listen() to be wrapped in an IF block 
// but it's good practice for local dev. This is the correct way:
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
  }

// 5. CRITICAL: Export for Vercel
module.exports = app;