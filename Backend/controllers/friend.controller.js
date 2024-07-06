const Friend = require("../models/friend.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const getAllFriendships = async (req, res) => {
  try {
    const response = await Friend.find({});
    if (!response) {
      return res
        .status(404)
        .json({ message: "No friendship found in database" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFriendship = async (req, res) => {
  try {
    const response = await Friend.create(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingFriendRequest = async (req, res) => {
  try {
    const { toUserID } = req.params;
    const response = await Friend.find({
      toUserID: toUserID,
    });
    if (!response) {
      return res
        .status(404)
        .json({ message: "No Pending Friend Request Found..." });
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFriendships,
  createFriendship,
  getPendingFriendRequest,
};
