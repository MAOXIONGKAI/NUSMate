const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

// Import models
const Profile = require("./models/profile.model");

// Import route
const profileRoute = require("./routes/profile.route.js");

// Set up cors
const cors = require("cors");

// Initialize App
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://nusmate.onrender.com", "https://nusmate-development.onrender.com"], // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    allowedHeaders: "Content-Type, Authorization", // Allowed headers
  })
);

// Use routes
app.use("/api/profiles", profileRoute);

// Testing Code
app.get("/", (req, res) => {
  res.send("NodeAPI running on " + process.env.NODE_ENV + " environment");
});

// Get MONGO_URI
const MONGO_URI = process.env.MONGO_URI;

// Database & Server Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Connection to database failed!", error);
  });
