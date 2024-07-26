const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { initSocket } = require("./socketManager");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Import models
const Profile = require("./models/profile.model");

// Import route
const profileRoute = require("./routes/profile.route.js");
const favoriteRoute = require("./routes/favorite.route.js");
const favoriteActivityRoute = require("./routes/favorite_activity.route.js")
const activityRoute = require("./routes/activity.route.js");
const friendRoute = require("./routes/friend.route.js");
const participantRoute = require("./routes/participant.route.js")

// Set up cors
const cors = require("cors");

// Initialize App
const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nusmate.onrender.com",
      "https://nusmate-development.onrender.com",
    ], // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    allowedHeaders: "Content-Type, Authorization", // Allowed headers
  })
);

// Use routes
app.use("/api/profiles", profileRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/favorite_activities", favoriteActivityRoute);
app.use("/api/activities", activityRoute);
app.use("/api/friends", friendRoute);
app.use("/api/participants", participantRoute);


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
    server.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Connection to database failed!", error);
  });
