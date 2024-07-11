const Participant = require("../models/participant.model");

const readAllParticipants = async (req, res) => {
  try {
    const response = await Participant.find({});
    if (!response) {
      return res
        .status(404)
        .json({ message: "No participants found in the database" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readParticipant = async (req, res) => {
  try {
    const response = await Participant.findOne(req.body);
    if (!response) {
      return res.status(404).json({ message: "Participant not found" });
    }
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

const removeParticipant = async (req, res) => {
  try {
    const { requestID } = req.params;
    const response = await Participant.findByIdAndDelete(requestID);
    if (!response) {
      return res
        .status(404)
        .json({ message: "No participants found to delete from the database" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  readAllParticipants,
  readParticipant,
  createParticipant,
  removeParticipant,
};
