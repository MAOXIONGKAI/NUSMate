const express = require('express');
const Participant = require('../models/participant.model');
const {model} = require('mongoose');
const router = express.Router();

const {readAllParticipants, createParticipant} = require('../controllers/participant.controller.js');

router.get("/", readAllParticipants);

router.post("/", createParticipant);

module.exports = router;