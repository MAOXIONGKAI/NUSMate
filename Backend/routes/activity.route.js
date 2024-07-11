const express = require("express");
const Activity = require("../models/activity.model");
const { model } = require("mongoose");
const router = express.Router();
const {
    createActivity,
    deleteActivity,
    getActvities,
    getActivity,
} = require("../controllers/activity.controller");

// Import controller from activity.controllers when needed

// Specify the routes
router.post("/", createActivity);

router.get("/", getActvities);

router.get("/:id", getActivity);

router.delete("/:id", deleteActivity);

module.exports = router;
