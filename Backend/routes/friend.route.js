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
} = require("../controllers/friend.controller.js");

router.get("/", getAllFriendships);

router.post("/", createFriendship);

router.get("/pending_request/:toUserID", getPendingFriendRequest);

router.post("/check_if_requested/", checkPendingFriendRequest);

router.delete("/withdraw_request", withdrawSentRequest)

module.exports = router;
