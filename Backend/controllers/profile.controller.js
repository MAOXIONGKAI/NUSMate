const Profile = require("../models/profile.model");
const buildQuery = require("../buildQuery");

const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAll = async (req, res) => {
  try {
    const profile = await Profile.find({});
    if (!profile) {
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readByID = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Profile.findOne({ email: email });
    if (!profile) {
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username: username });
    if (!profile) {
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readByTags = async (req, res) => {
  try {
    const query = buildQuery(req.body);
    const profiles = await Profile.aggregate(query);
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body);
    if (!profile) {
      return;
    }
    const updatedProfile = await Profile.findById(id);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Profile.findOneAndUpdate({ email: email }, req.body);
    if (!profile) {
      return;
    }
    const updatedProfile = await Profile.findOne({ email: email });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOneAndUpdate(
      { username: username },
      req.body
    );
    if (!profile) {
      return;
    }
    const updatedProfile = await Profile.findOne({ username: username });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProfile,
  readAll,
  readByID,
  readByEmail,
  readByUsername,
  readByTags,
  updateByID,
  updateByEmail,
  updateByUsername,
  deleteByID,
};
