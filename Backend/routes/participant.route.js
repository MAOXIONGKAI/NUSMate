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
  readAllPendingRequests,
  approveParticipant,
  declineParticipant,
  readAllJoinedActivities,
  checkIfJoined,
  readAllAssociatedParticipation,
} = require("../controllers/participant.controller.js");

router.get("/", readAllParticipants);

router.post("/participant/", readParticipant);

router.post("/sent_requests/:userID", readAllSentRequests);

router.post("/pending_requests/:hostID", readAllPendingRequests);

router.post("/joined_activities/:userID", readAllJoinedActivities);

router.post("/associated_participations/:userID", readAllAssociatedParticipation);

router.post("/check_if_joined", checkIfJoined);

router.post("/", createParticipant);

router.put("/approve_request/:id", approveParticipant);

router.put("/decline_request/:id", declineParticipant);

router.delete("/:requestID", removeParticipant);

module.exports = router;
