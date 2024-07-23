const FavoriteActivity = require("../models/favorite_activity.model");

const createFavorite = async (req, res) => {
  try {
    const relationship = await FavoriteActivity.create(req.body);
    res.status(200).json(relationship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readAll = async (req, res) => {
  try {
    const favorites = await FavoriteActivity.find({});
    if (!favorites) {
      return res
        .status(404)
        .json({ message: "No favorite activities found in database" });
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const favorites = await FavoriteActivity.find({ userID: userID });
    if (!favorites) {
      return res
        .status(404)
        .json({ message: "No favorite activity collection found in database" });
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const readFavoriteStatus = async (req, res) => {
  try {
    const relationship = await FavoriteActivity.find(req.body);

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "No such relationship in database" });
    }
    res.status(200).json(relationship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const relationship = await FavoriteActivity.findOneAndDelete(req.body);
    if (!relationship) {
      return res
        .status(404)
        .json({ message: "No relationship found to delete" });
    }
    res.status(200).json(relationship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFavorite,
  readAll,
  readByUserID,
  readFavoriteStatus,
  deleteFavorite,
};
