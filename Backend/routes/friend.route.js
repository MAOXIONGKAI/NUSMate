const express = require("express");
const Friend = require("../models/friend.model");
const { model } = require("mongoose");
const router = express.Router();

const { getAllFriendships, createFriendship } = require("../controllers/friend.controller.js");

router.get("/", getAllFriendships);

router.post("/", createFriendship);

module.exports = router;