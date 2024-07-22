const express = require("express");
const Activity = require("../models/activity.model");
const { model } = require("mongoose");
const router = express.Router();
const {
    createActivity,
    deleteActivity,
    getActvities,
    getActivity,
    editActivity,
} = require("../controllers/activity.controller");

// Import controller from activity.controllers when needed

// Specify the routes
router.post("/", createActivity);

router.post("/:activityID", editActivity);

router.get("/", getActvities);

router.get("/:id", getActivity);

router.delete("/:id", deleteActivity);

module.exports = router;
