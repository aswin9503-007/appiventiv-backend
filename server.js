const express =require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenvtenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/heroRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`)});

module.exports=app;
