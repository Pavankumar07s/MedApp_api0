const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const generateOTP = require("./routes/generateOTP");
const protectedRoutes = require("./routes/protectedRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const fileUploadRoute = require("./routes/fileUploadRoute");

// Load environment variables
dotenv.config({ path: "./config.env" });

// Check if environment variables are loaded correctly
if (!process.env.MONGODB_URI || !process.env.MONGODB_PASSWORD) {
  console.error("Missing MONGODB_URI or MONGODB_PASSWORD in config.env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 8000;

const DB = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

// Debugging statements
console.log(`Connecting to MongoDB at ${DB}`);
console.log(`Server will run on port ${PORT}`);

// Middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/protected", authMiddleware, protectedRoutes);
app.use("/api/generateOTP", generateOTP);
app.use("/api/upload", fileUploadRoute);
// MongoDB Connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
