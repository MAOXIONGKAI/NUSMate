const Activity = require("../models/activity.model");
const {getIo} = require("../socketManager");

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActvities = async (req, res) => {
  try {
    const activity = await Activity.find({}).sort({ updatedAt: -1 });
    if (!activity) {
      return;
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return;
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editActivity = async (req, res) => {
  try {
    const { activityID } = req.params;
    const activity = await Activity.findByIdAndUpdate(activityID, req.body);
    if (!activity) {
      return;
    }
    const io = getIo();
    io.sockets.emit('receiveNotification', "Data")
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return;
    }
    return res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActivity,
  editActivity,
  getActvities,
  getActivity,
  deleteActivity,
};
