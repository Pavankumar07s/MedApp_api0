const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const generateOTP = require("./routes/generateOTP");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const passwordResetRoutes = require("./routes/passwordResetRoutes");
const fileUploadRoute = require("./routes/fileUploadRoute");
const downloadRoute = require("./routes/downloadRoute");
const paymentRoute = require("./routes/paymentRoute");
const doctorRoute = require("./routes/doctorRoute");
const redisClient = require("./redisClient");
const rateLimiter = require("./middlewares/rateLimiter");
const healthFitnessRoutes = require("./routes/healthFitnessRoutes");

const cors = require("cors");
// Load environment variables

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
console.log(`Server will run on port ${PORT}`);

// Middleware
app.use(bodyParser.json(), cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "your_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use("/api/users", rateLimiter, userRoutes);
app.use("/api/doctor", doctorRoute);
app.use("/api/auth", rateLimiter, authRoutes);
app.use("/api/protected", authMiddleware, protectedRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/generateOTP", generateOTP);
app.use("/api/upload", fileUploadRoute);
app.use("/api/download", downloadRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/healthFitness", healthFitnessRoutes);
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
