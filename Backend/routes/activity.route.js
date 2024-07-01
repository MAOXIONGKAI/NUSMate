const express = require("express");
const Activity = require("../models/activity.model");
const { model } = require("mongoose");
const router = express.Router();
const {
    createActivity,
    deleteActivity,
    getActvities,
} = require("../controllers/activity.controller");

// Import controller from activity.controllers when needed

// Specify the routes
router.post("/", createActivity);

router.get("/", getActvities)

router.delete("/:id", deleteActivity);

module.exports = router;
