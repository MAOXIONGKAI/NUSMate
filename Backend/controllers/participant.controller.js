const Participant = require("../models/participant.model");

const readAllParticipants = async (req, res) => {
  try {
    const response = await Participant.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createParticipant = async (req, res) => {
  try {
    const response = await Participant.create(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { readAllParticipants, createParticipant };
