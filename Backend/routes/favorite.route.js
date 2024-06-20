const express = require("express");
const Favorite = require("../models/favorite.model");
const { model } = require("mongoose");
const router = express.Router();
const {
  createFavorite,
  readAll,
  readByUserID,
  readFavoriteStatus,
  deleteFavorite
} = require("../controllers/favorite.controller");

// Import controller from favorite.controllers when needed

// Specify the routes
router.get("/", readAll);

router.get("/:userID", readByUserID);

router.post("/check_relationship", readFavoriteStatus)

router.post("/", createFavorite);

router.delete("/", deleteFavorite);

module.exports = router;
