const express = require("express");
const mongoose = require("mongoose");

// Import models
const Profile = require("./models/profile.model");

// Import route
const profileRoute = require("./routes/profile.route.js")

//Initialize App
const app = express();

// Middleware
app.use(express.json());

//routes
app.use("/api/profiles", profileRoute)

// Testing Code
app.get("/", (req, res) => {
  res.send("Hello from Node API again and again");
});

// Database & Server Connection
mongoose
  .connect(
    "mongodb+srv://conan7153:69R5Zexv4A3FGfHZ@nusmatedb.gcpoyrx.mongodb.net/NUSMate-API?retryWrites=true&w=majority&appName=NUSMateDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });
