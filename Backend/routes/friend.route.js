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
} = require("../controllers/friend.controller.js");

router.get("/", getAllFriendships);

router.post("/", createFriendship);

router.get("/pending_request/:toUserID", getPendingFriendRequest);

router.post("/check_if_requested", checkPendingFriendRequest);

router.post("/check_if_friend", checkIfFriend);

router.put("/approve_request/:requestID", approvePendingFriendRequest);

router.put("/decline_request/:requestID", declinePendingFriendRequest)

router.delete("/withdraw_request/:requestID", withdrawSentRequest);

router.delete("/remove_friend/:friendshipID", removeFriend);

module.exports = router;
