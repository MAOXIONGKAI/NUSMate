const express = require("express");
const Profile = require("../models/profile.model");
const router = express.Router();
const {
  createProfile,
  readAll,
  readByID,
  readByEmail,
  readByUsername,
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

router.put("/:id", updateByID);

router.put("/email/:email", updateByEmail);

router.put("/username/:username", updateByUsername);

router.delete("/:id", deleteByID);

module.exports = router;
