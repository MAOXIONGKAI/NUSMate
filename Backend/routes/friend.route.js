const express = require("express");
const Friend = require("../models/friend.model");
const { model } = require("mongoose");
const router = express.Router();

const {
  getAllFriendships,
  createFriendship,
  getPendingFriendRequest,
  checkPendingFriendRequest,
  withdrawSentRequest,
  approvePendingFriendRequest,
  checkIfFriend,
  declinePendingFriendRequest,
  removeFriend,
  getSentFriendRequest,
  getFriends,
  getUserFriendStatus,
} = require("../controllers/friend.controller.js");

router.get("/", getAllFriendships);

router.get("/:userID", getUserFriendStatus);

router.post("/", createFriendship);

router.get("/pending_request/:toUserID", getPendingFriendRequest);

router.get("/sent_request/:fromUserID", getSentFriendRequest);

router.get("/all_friends/:userID", getFriends);

router.post("/check_if_requested", checkPendingFriendRequest);

router.post("/check_if_friend", checkIfFriend);

router.put("/approve_request/:requestID", approvePendingFriendRequest);

router.put("/decline_request/:requestID", declinePendingFriendRequest)

router.delete("/withdraw_request/:requestID", withdrawSentRequest);

router.delete("/remove_friend/:friendshipID", removeFriend);

module.exports = router;
