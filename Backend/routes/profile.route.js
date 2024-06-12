const express = require("express");
const Profile = require("../models/profile.model");
const router = express.Router();
const {
  createProfile,
  readAll,
  readByID,
  readByEmail,
  readByUsername,
  readByTags,
  updateByID,
  updateByEmail,
  updateByUsername,
  deleteByID,
} = require("../controllers/profile.controller");

router.post("/", createProfile);

router.get("/", readAll);

router.get("/:id", readByID);

router.get("/email/:email", readByEmail);

router.get("/username/:username", readByUsername);

// Using post request to get around URL length limitation when the 
// query body is too long
router.post("/query", readByTags);

router.put("/:id", updateByID);

router.put("/email/:email", updateByEmail);

router.put("/username/:username", updateByUsername);

router.delete("/:id", deleteByID);

module.exports = router;
