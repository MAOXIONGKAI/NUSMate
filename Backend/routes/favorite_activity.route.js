const express = require("express");
const FavoriteActivity = require("../models/favorite_activity.model");
const { model } = require("mongoose");
const router = express.Router();
const {
  createFavorite,
  readAll,
  readByUserID,
  readFavoriteStatus,
  deleteFavorite,
} = require("../controllers/favorite_activity.controller");

// Import controller from favorite_activity.controllers when needed

// Specify the routes
router.get("/", readAll);

router.get("/:userID", readByUserID);

router.post("/check_relationship", readFavoriteStatus);

router.post("/", createFavorite);

router.delete("/", deleteFavorite);

module.exports = router;
