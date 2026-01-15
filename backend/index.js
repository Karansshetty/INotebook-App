const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();


connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`iNotebook backend running on port ${PORT}`);
});
