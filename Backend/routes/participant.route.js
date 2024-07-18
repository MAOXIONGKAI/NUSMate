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
  readAllJoinedParticipants,
  checkIfInvited,
  acceptInvitation,
  rejectInvitation,
  removeAllParticipantsbyActivity,
} = require("../controllers/participant.controller.js");

router.get("/", readAllParticipants);

router.post("/participant/", readParticipant);

router.post("/sent_requests/:userID", readAllSentRequests);

router.post("/pending_requests/:hostID", readAllPendingRequests);

router.post("/joined_activities/:userID", readAllJoinedActivities);

router.post("/joined_participants/:activityID", readAllJoinedParticipants);

router.post(
  "/associated_participations/:userID",
  readAllAssociatedParticipation
);

router.post("/check_if_joined", checkIfJoined);

router.post("/check_if_invited", checkIfInvited);

router.post("/", createParticipant);

router.put("/approve_request/:id", approveParticipant);

router.put("/decline_request/:id", declineParticipant);

router.put("/accept_invitation/:id", acceptInvitation);

router.put("/reject_invitation/:id", rejectInvitation);

router.delete("/:requestID", removeParticipant);

router.delete(
  "/remove_all_participants/:activityID",
  removeAllParticipantsbyActivity
);

module.exports = router;
