const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // Add path module
require("dotenv").config();

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
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

// Use routes
app.use("/api/profiles", profileRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  // Catch-all route for React frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  // Testing Code
  app.get("/", (req, res) => {
    res.send("Hello from Node API again and again");
  });
}

// Get MONGO_URI
const MONGO_URI = process.env.MONGO_URI;

// Database & Server Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Connection to database failed!", error);
  });
