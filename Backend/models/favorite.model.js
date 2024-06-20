const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    favoriteUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true,}
);

// Create unique index based on the two user's ID to ensure that the database
// does not contain multiple entries of same favorite relationship
FavoriteSchema.index({ userID: 1, favoriteUserID: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
