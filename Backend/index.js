const express = require("express");
const mongoose = require("mongoose");

// Import models
const Profile = require("./models/profile.model");
const { ProfilingLevel } = require("mongodb");

//Initialize App
const app = express();

// Middleware
app.use(express.json());

// Testing Code
app.get("/", (req, res) => {
  res.send("Hello from Node API again and again");
});

// API
// Profile - Create
app.post("/api/profiles", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Read All
app.get("/api/profiles", async (req, res) => {
  try {
    const profile = await Profile.find({});
    if (!profile) {
        return res.status(404).json({message: "No profile found in database"})
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Read by ID
app.get("/api/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
        return res.status(400).json({message: "Profile not found"})
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Read by Email
app.get("/api/profile/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Profile.findOne({ email: email });
    if (!profile) {
      return res.status(404).json({ message: "Invalid Email - Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Read by Username
app.get("/api/profile/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username: username });
    if (!profile) {
      return res.status(404).json({ message: "Invalid Username - Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Update by ID
app.put("/api/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body);
    if (!profile) {
        return res.status(404).json({message: "Profile not found"})
    }
    const updatedProfile = await Profile.findById(id)
    res.status(200).json(updatedProfile)
} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Update by Email
app.put("/api/profile/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Profile.findOneAndUpdate({email: email}, req.body);
    if (!profile) {
        return res.status(404).json({message: "Invalid Email - Profile not found"})
    }
    const updatedProfile = await Profile.findOne({email: email})
    res.status(200).json(updatedProfile)
} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile - Update by Username
app.put("/api/profile/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOneAndUpdate({username: username}, req.body);
    if (!profile) {
        return res.status(404).json({message: "Invalid Username - Profile not found"})
    }
    const updatedProfile = await Profile.findOne({username: username})
    res.status(200).json(updatedProfile)
} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Profile - Delete by ID
app.delete("/api/profile/:id", async (req, res) => {
    try {
        const { id } = req.params
        const profile = await Profile.findByIdAndDelete(id)
        if (!profile) {
            return res.status(404).json({message: "Profile not found"})
        }
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

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
