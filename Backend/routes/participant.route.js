const express = require("express");
const Participant = require("../models/participant.model");
const { model } = require("mongoose");
const router = express.Router();

const {
  readAllParticipants,
  createParticipant,
  removeParticipant,
  readParticipant,
} = require("../controllers/participant.controller.js");

router.get("/", readAllParticipants);

router.post("/participant/", readParticipant);

router.post("/", createParticipant);

router.delete("/:requestID", removeParticipant);

module.exports = router;
