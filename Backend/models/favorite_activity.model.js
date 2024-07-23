const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const FavoriteActivitySchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    favoriteActivityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
  },
  { timestamps: true }
);

// Create unique index based on the two user's ID to ensure that the database
// does not contain multiple entries of same favorite relationship
FavoriteActivitySchema.index({ userID: 1, favoriteActivityID: 1 }, { unique: true });

const FavoriteActivity = mongoose.model("FavoriteActivity", FavoriteActivitySchema);

module.exports = FavoriteActivity;
