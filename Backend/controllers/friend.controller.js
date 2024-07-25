const Friend = require("../models/friend.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {getIo} = require("../socketManager")

const getAllFriendships = async (req, res) => {
  try {
    const response = await Friend.find({});
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserFriendStatus = async (req, res) => {
  try {
    const { userID } = req.params;
    const query = {
      $or: [
        { fromUserID: userID, status: "Approved" },
        { fromUserID: userID, status: "Declined" },
        { toUserID: userID, status: "Pending" },
      ],
    };
    const response = await Friend.find(query).sort({ updatedAt: -1 });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFriendship = async (req, res) => {
  try {
    const response = await Friend.create(req.body);
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
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
      status: "Pending",
    }).sort({ createdAt: -1 });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSentFriendRequest = async (req, res) => {
  try {
    const { fromUserID } = req.params;
    const response = await Friend.find({
      fromUserID: fromUserID,
      status: "Pending",
    }).sort({ createdAt: -1 });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriends = async (req, res) => {
  try {
    const { userID } = req.params;
    const query = {
      $or: [
        { fromUserID: userID, status: "Approved" },
        { toUserID: userID, status: "Approved" },
      ],
    };
    const response = await Friend.find(query).sort({ createdAt: -1 });
    if (!response) {
      return;
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
      return;
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
      return;
    }
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkIfFriend = async (req, res) => {
  try {
    const { fromUserID, toUserID } = req.body;
    const query = {
      $or: [
        {
          fromUserID: fromUserID,
          toUserID: toUserID,
          status: "Approved",
        },
        {
          fromUserID: toUserID,
          toUserID: fromUserID,
          status: "Approved",
        },
      ],
    };
    const response = await Friend.findOne(query);
    if (!response) {
      return;
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
      return;
    }
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
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
      return;
    }
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
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
      return;
    }
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { requestID } = req.params;
    const response = await Friend.findByIdAndUpdate(requestID, req.body, {
      timestamps: false,
    });
    if (!response) {
      return;
    }
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFriendships,
  getUserFriendStatus,
  createFriendship,
  getPendingFriendRequest,
  getSentFriendRequest,
  getFriends,
  checkPendingFriendRequest,
  checkIfFriend,
  withdrawSentRequest,
  approvePendingFriendRequest,
  declinePendingFriendRequest,
  removeFriend,
  markAsRead,
};
