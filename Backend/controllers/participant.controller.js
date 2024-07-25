const Participant = require("../models/participant.model");
const {getIo} = require("../socketManager");

const readAllParticipants = async (req, res) => {
  try {
    const response = await Participant.find({});
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAllSentRequests = async (req, res) => {
  try {
    const { userID } = req.params;
    const response = await Participant.find({
      participantID: userID,
      status: "Pending",
    });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAllJoinedActivities = async (req, res) => {
  try {
    const { userID } = req.params;
    const query = {
      $or: [
        {
          participantID: userID,
          status: "Approved",
        },
        { participantID: userID, status: "Invite-Accepted" },
      ],
    };
    const response = await Participant.find(query).sort({ updatedAt: -1 });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAllJoinedParticipants = async (req, res) => {
  try {
    const { activityID } = req.params;
    const query = {
      $or: [
        {
          activityID: activityID,
          status: "Approved",
        },
        {
          activityID: activityID,
          status: "Invite-Accepted",
        },
      ],
    };
    const response = await Participant.find(query).sort({ updatedAt: -1 });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAllPendingRequests = async (req, res) => {
  try {
    const { hostID } = req.params;
    const query = {
      $or: [
        {
          hostID: hostID,
          status: "Pending",
        },
        { participantID: hostID, status: "Invited" },
      ],
    };
    const response = await Participant.find(query).sort({ updatedAt: -1 });
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAllAssociatedParticipation = async (req, res) => {
  try {
    const { userID } = req.params;
    const query = {
      $or: [
        { hostID: userID, status: "Pending" },
        { hostID: userID, status: "Invite-Accepted" },
        { hostID: userID, status: "Invite-Rejected" },
        { participantID: userID, status: "Approved" },
        { participantID: userID, status: "Declined" },
        { participantID: userID, status: "Invited" },
      ],
    };
    const response = await Participant.find(query).sort({ updatedAt: -1 });
    if (!response) {
      return;
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
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkIfJoined = async (req, res) => {
  try {
    const response = await Participant.findOne(req.body);
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkIfInvited = async (req, res) => {
  try {
    const response = await Participant.findOne(req.body);
    if (!response) {
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createParticipant = async (req, res) => {
  try {
    const response = await Participant.create(req.body);
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Participant.findByIdAndUpdate(id, req.body);
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

const declineParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Participant.findByIdAndUpdate(id, req.body);
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

const acceptInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Participant.findByIdAndUpdate(id, req.body);
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

const rejectInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Participant.findByIdAndUpdate(id, req.body);
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

const removeParticipant = async (req, res) => {
  try {
    const { requestID } = req.params;
    const response = await Participant.findByIdAndDelete(requestID);
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

const removeAllParticipantsbyActivity = async (req, res) => {
  try {
    const { activityID } = req.params;
    const response = await Participant.deleteMany({ activityID: activityID });
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
    const response = await Participant.findByIdAndUpdate(requestID, req.body, {
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
  readAllParticipants,
  readAllSentRequests,
  readAllPendingRequests,
  readAllJoinedActivities,
  readAllJoinedParticipants,
  readAllAssociatedParticipation,
  checkIfJoined,
  checkIfInvited,
  readParticipant,
  createParticipant,
  approveParticipant,
  declineParticipant,
  acceptInvitation,
  rejectInvitation,
  removeParticipant,
  removeAllParticipantsbyActivity,
  markAsRead,
};
