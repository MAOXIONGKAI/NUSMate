const express = require("express");
const Friend = require("../models/friend.model");
const { model } = require("mongoose");
const router = express.Router();

const {
  getAllFriendships,
  createFriendship,
  getPendingFriendRequest,
} = require("../controllers/friend.controller.js");

router.get("/", getAllFriendships);

router.post("/", createFriendship);

router.get("/pending_request/:toUserID", getPendingFriendRequest);

module.exports = router;
