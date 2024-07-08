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
    }).sort({ createdAt: -1 });
    if (!response) {
      return res
        .status(404)
        .json({ message: "No Pending Friend Request Found..." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkPendingFriendRequest = async (req, res) => {
  try {
    const response = await Friend.findOne(req.body);
    if (!response) {
      return res
        .status(404)
        .json({ message: "No Pending Friend Request between users..." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const withdrawSentRequest = async (req, res) => {
  try {
    const { requestID } = req.params;
    const response = await Friend.findByIdAndDelete(requestID);
    if (!response) {
      return res
        .status(404)
        .json({ message: "No pending request to delete in database" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkIfFriend = async (req, res) => {
  try {
    let response = await Friend.findOne(req.body);
    if (!response) {
      response = await Friend.findOne({
        fromUserID: req.body.toUserID,
        toUserID: req.body.fromUserID,
        status: "Approved",
      });

      if (!response) {
        return res
          .status(404)
          .json({ message: "The two users are not friends..." });
      }
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approvePendingFriendRequest = async (req, res) => {
  try {
    const { requestID } = req.params;
    const response = await Friend.findByIdAndUpdate(requestID, req.body);
    if (!response) {
      return res
        .status(404)
        .json({ message: "No pending friend request to approve in database" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const declinePendingFriendRequest = async (req, res) => {
  try {
    const { requestID } = req.params;
    const response = await Friend.findByIdAndUpdate(requestID, req.body);
    if (!response) {
      return res
        .status(404)
        .json({ message: "No pending friend request to decline in database" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFriend = async (req, res) => {
  try {
    const { friendshipID } = req.params;
    const response = await Friend.findByIdAndDelete(friendshipID);
    if (!response) {
      return res
        .status(404)
        .json({ message: "No friendship found in database for deletion" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFriendships,
  createFriendship,
  getPendingFriendRequest,
  checkPendingFriendRequest,
  checkIfFriend,
  withdrawSentRequest,
  approvePendingFriendRequest,
  declinePendingFriendRequest,
  removeFriend,
};
