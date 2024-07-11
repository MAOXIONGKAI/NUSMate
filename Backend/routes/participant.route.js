const express = require("express");
const Participant = require("../models/participant.model");
const { model } = require("mongoose");
const router = express.Router();

const {
  readAllParticipants,
  readAllSentRequests,
  createParticipant,
  removeParticipant,
  readParticipant,
} = require("../controllers/participant.controller.js");

router.get("/", readAllParticipants);

router.post("/participant/", readParticipant);

router.post("/sent_requests/:userID", readAllSentRequests);

router.post("/", createParticipant);

router.delete("/:requestID", removeParticipant);

module.exports = router;
