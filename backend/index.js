const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Please set it in backend/.env");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Please set it in backend/.env");
  }

  await connectToMongo();

  app.listen(PORT, () => {
    console.log(`Backend in running in http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Backend startup failed:", error.message);
  process.exit(1);
});
